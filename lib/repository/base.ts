import { Pool, PoolClient } from "pg"

export interface WhereCondition {
  [key: string]: unknown
}

export interface JoinCondition {
  table: string
  type?: "INNER" | "LEFT" | "RIGHT" | "FULL"
  on: string
}

export interface OrderByCondition {
  column: string
  direction?: "ASC" | "DESC"
}

export interface PaginationOptions {
  limit?: number
  offset?: number
}

export interface QueryOptions extends PaginationOptions {
  select?: string[]
  where?: WhereCondition
  orderBy?: OrderByCondition[]
  joins?: JoinCondition[]
}

export abstract class BaseRepository<T = Record<string, unknown>> {
  protected pool: Pool
  protected tableName: string

  constructor(pool: Pool, tableName: string) {
    this.pool = pool
    this.tableName = tableName
  }

  private buildSelectQuery(options: QueryOptions = {}): { query: string; values: unknown[] } {
    const { select, where, orderBy, joins, limit, offset } = options

    let query = `SELECT ${select ? select.join(", ") : "*"} FROM "${this.tableName}"`
    const values: unknown[] = []
    let paramCount = 0

    if (joins && joins.length > 0) {
      for (const join of joins) {
        const joinType = join.type || "INNER"
        query += ` ${joinType} JOIN "${join.table}" ON ${join.on}`
      }
    }

    if (where && Object.keys(where).length > 0) {
      const conditions: string[] = []
      for (const [key, value] of Object.entries(where)) {
        paramCount++
        if (value === null) {
          conditions.push(`"${key}" IS NULL`)
        } else if (Array.isArray(value)) {
          const placeholders = value.map(() => `$${++paramCount}`).join(", ")
          conditions.push(`"${key}" IN (${placeholders})`)
          values.push(...value)
          paramCount += value.length - 1
        } else {
          conditions.push(`"${key}" = $${paramCount}`)
          values.push(value)
        }
      }
      query += ` WHERE ${conditions.join(" AND ")}`
    }

    if (orderBy && orderBy.length > 0) {
      const orderClauses = orderBy.map(order => `"${order.column}" ${order.direction || "ASC"}`)
      query += ` ORDER BY ${orderClauses.join(", ")}`
    }

    if (limit) {
      query += ` LIMIT $${++paramCount}`
      values.push(limit)
    }

    if (offset) {
      query += ` OFFSET $${++paramCount}`
      values.push(offset)
    }

    return { query, values }
  }

  async findOne(options: Omit<QueryOptions, "limit" | "offset"> = {}): Promise<T | null> {
    const { query, values } = this.buildSelectQuery({ ...options, limit: 1 })

    const client = await this.pool.connect()
    try {
      const result = await client.query(query, values)
      return result.rows.length > 0 ? result.rows[0] : null
    } finally {
      client.release()
    }
  }

  async findMany(options: QueryOptions = {}): Promise<T[]> {
    const { query, values } = this.buildSelectQuery(options)

    const client = await this.pool.connect()
    try {
      const result = await client.query(query, values)
      return result.rows
    } finally {
      client.release()
    }
  }

  async findById(id: string, options: Omit<QueryOptions, "where"> = {}): Promise<T | null> {
    return this.findOne({ ...options, where: { id } })
  }

  async createOne(data: Partial<T>): Promise<T> {
    const keys = Object.keys(data)
    const values = Object.values(data)
    const placeholders = values.map((_, index) => `$${index + 1}`)

    const query = `
      INSERT INTO "${this.tableName}" (${keys.map(k => `"${k}"`).join(", ")})
      VALUES (${placeholders.join(", ")})
      RETURNING *
    `

    const client = await this.pool.connect()
    try {
      const result = await client.query(query, values)
      return result.rows[0]
    } finally {
      client.release()
    }
  }

  async createMany(dataArray: Partial<T>[]): Promise<T[]> {
    if (dataArray.length === 0) return []

    const keys = Object.keys(dataArray[0] as Record<string, unknown>)
    const values: unknown[] = []
    const valueRows: string[] = []

    let paramCount = 0
    for (const data of dataArray) {
      const rowPlaceholders = keys.map(() => `$${++paramCount}`)
      valueRows.push(`(${rowPlaceholders.join(", ")})`)
      values.push(...keys.map(key => data[key as keyof Partial<T>]))
    }

    const query = `
      INSERT INTO "${this.tableName}" (${keys.map(k => `"${k}"`).join(", ")})
      VALUES ${valueRows.join(", ")}
      RETURNING *
    `

    const client = await this.pool.connect()
    try {
      const result = await client.query(query, values)
      return result.rows
    } finally {
      client.release()
    }
  }

  async updateOne(where: WhereCondition, data: Partial<T>): Promise<T | null> {
    const dataKeys = Object.keys(data)
    const dataValues = Object.values(data)

    const setClause = dataKeys.map((key, index) => `"${key}" = $${index + 1}`).join(", ")

    const whereKeys = Object.keys(where)
    const whereValues = Object.values(where)
    const whereClause = whereKeys
      .map((key, index) => `"${key}" = $${dataKeys.length + index + 1}`)
      .join(" AND ")

    const query = `
      UPDATE "${this.tableName}"
      SET ${setClause}
      WHERE ${whereClause}
      RETURNING *
    `

    const client = await this.pool.connect()
    try {
      const result = await client.query(query, [...dataValues, ...whereValues])
      return result.rows.length > 0 ? result.rows[0] : null
    } finally {
      client.release()
    }
  }

  async updateMany(where: WhereCondition, data: Partial<T>): Promise<T[]> {
    const dataKeys = Object.keys(data)
    const dataValues = Object.values(data)

    const setClause = dataKeys.map((key, index) => `"${key}" = $${index + 1}`).join(", ")

    const whereKeys = Object.keys(where)
    const whereValues = Object.values(where)
    const whereClause = whereKeys
      .map((key, index) => `"${key}" = $${dataKeys.length + index + 1}`)
      .join(" AND ")

    const query = `
      UPDATE "${this.tableName}"
      SET ${setClause}
      WHERE ${whereClause}
      RETURNING *
    `

    const client = await this.pool.connect()
    try {
      const result = await client.query(query, [...dataValues, ...whereValues])
      return result.rows
    } finally {
      client.release()
    }
  }

  async updateById(id: string, data: Partial<T>): Promise<T | null> {
    return this.updateOne({ id }, data)
  }

  async deleteOne(where: WhereCondition): Promise<T | null> {
    const whereKeys = Object.keys(where)
    const whereValues = Object.values(where)
    const whereClause = whereKeys.map((key, index) => `"${key}" = $${index + 1}`).join(" AND ")

    const query = `
      DELETE FROM "${this.tableName}"
      WHERE ${whereClause}
      RETURNING *
    `

    const client = await this.pool.connect()
    try {
      const result = await client.query(query, whereValues)
      return result.rows.length > 0 ? result.rows[0] : null
    } finally {
      client.release()
    }
  }

  async deleteMany(where: WhereCondition): Promise<T[]> {
    const whereKeys = Object.keys(where)
    const whereValues = Object.values(where)
    const whereClause = whereKeys.map((key, index) => `"${key}" = $${index + 1}`).join(" AND ")

    const query = `
      DELETE FROM "${this.tableName}"
      WHERE ${whereClause}
      RETURNING *
    `

    const client = await this.pool.connect()
    try {
      const result = await client.query(query, whereValues)
      return result.rows
    } finally {
      client.release()
    }
  }

  async deleteById(id: string): Promise<T | null> {
    return this.deleteOne({ id })
  }

  async count(where?: WhereCondition): Promise<number> {
    let query = `SELECT COUNT(*) FROM "${this.tableName}"`
    const values: unknown[] = []

    if (where && Object.keys(where).length > 0) {
      const conditions: string[] = []
      let paramCount = 0

      for (const [key, value] of Object.entries(where)) {
        paramCount++
        if (value === null) {
          conditions.push(`"${key}" IS NULL`)
        } else {
          conditions.push(`"${key}" = $${paramCount}`)
          values.push(value)
        }
      }
      query += ` WHERE ${conditions.join(" AND ")}`
    }

    const client = await this.pool.connect()
    try {
      const result = await client.query(query, values)
      return parseInt(result.rows[0].count)
    } finally {
      client.release()
    }
  }

  async exists(where: WhereCondition): Promise<boolean> {
    const count = await this.count(where)
    return count > 0
  }

  async transaction<R>(callback: (client: PoolClient) => Promise<R>): Promise<R> {
    const client = await this.pool.connect()
    try {
      await client.query("BEGIN")
      const result = await callback(client)
      await client.query("COMMIT")
      return result
    } catch (error) {
      await client.query("ROLLBACK")
      throw error
    } finally {
      client.release()
    }
  }

  async rawQuery(query: string, values: unknown[] = []): Promise<T[]> {
    const client = await this.pool.connect()
    try {
      const result = await client.query(query, values)
      return result.rows
    } finally {
      client.release()
    }
  }

  async upsert(data: Partial<T>, conflictColumns: string[] = ["id"]): Promise<T> {
    const keys = Object.keys(data)
    const values = Object.values(data)
    const placeholders = values.map((_, index) => `$${index + 1}`)

    const updateClause = keys
      .filter(key => !conflictColumns.includes(key))
      .map(key => `"${key}" = EXCLUDED."${key}"`)
      .join(", ")

    const query = `
      INSERT INTO "${this.tableName}" (${keys.map(k => `"${k}"`).join(", ")})
      VALUES (${placeholders.join(", ")})
      ON CONFLICT (${conflictColumns.map(c => `"${c}"`).join(", ")})
      DO UPDATE SET ${updateClause}
      RETURNING *
    `

    const client = await this.pool.connect()
    try {
      const result = await client.query(query, values)
      return result.rows[0]
    } finally {
      client.release()
    }
  }

  async findWithPagination(
    options: QueryOptions = {},
    page: number = 1,
    pageSize: number = 10
  ): Promise<{ data: T[]; total: number; page: number; pageSize: number; totalPages: number }> {
    const offset = (page - 1) * pageSize
    const data = await this.findMany({ ...options, limit: pageSize, offset })
    const total = await this.count(options.where)
    const totalPages = Math.ceil(total / pageSize)

    return {
      data,
      total,
      page,
      pageSize,
      totalPages,
    }
  }
}

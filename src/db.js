/**
 * 获取计数值
 * @param {D1Database} db D1 数据库实例
 * @param {string} id 计数器 ID
 * @returns {Promise<number>} 计数值
 */
const getNum = async (db, id) => {
  try {
    const stmt = db.prepare('SELECT num FROM view WHERE id = ?').bind(id);
    const result = await stmt.first();
    return result && result.num ? Number(result.num) : 0;
  } catch (err) {
    console.error('Error getting num:', err);
    return 0;
  }
};

/**
 * 设置计数值
 * @param {D1Database} db D1 数据库实例
 * @param {string} id 计数器 ID
 * @param {number} num 计数值
 * @returns {Promise<void>}
 */
const setNum = async (db, id, num) => {
  try {
    const stmt = db
      .prepare('INSERT INTO view (id, num) VALUES (?1, ?2) ON CONFLICT (id) DO UPDATE SET num = ?2')
      .bind(id, num);
    await stmt.run();
  } catch (err) {
    console.error('Error setting num:', err);
  }
};

export { getNum, setNum };

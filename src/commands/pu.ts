#!/usr/bin/env node
import { exit, stdout } from 'node:process'
import { log, processProfileCollection, SUPPORTED_PROFILE_COLLECTIONS } from '../index'

/**
 * 主函数
 */
async function main(): Promise<void> {
  stdout.write('\n')
  log('开始删除配置文件...', 'success')
  stdout.write('\n')

  // 遍历所有支持的配置文件集合
  for (const collection of SUPPORTED_PROFILE_COLLECTIONS) {
    await processProfileCollection(collection, 'remove')
  }
}

// 执行主函数
main().catch((error) => {
  log(`执行过程中发生错误: ${error}`, 'error')
  exit(1)
})

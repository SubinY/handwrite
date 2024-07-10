import { Redis } from '@upstash/redis'
console.log(process.env.UPSTASH_REDIS_REST_URL, 'process.env.UPSTASH_REDIS_REST_URL')
const redis = new Redis({
  url: `${process.env.UPSTASH_REDIS_REST_URL}`,
  token: `${process.env.UPSTASH_REDIS_REST_TOKEN}`,
  // 重试策略
  retry: {
    retries: 5,
    backoff: (retryCount) => Math.exp(retryCount) * 50,
  },
})

export default redis
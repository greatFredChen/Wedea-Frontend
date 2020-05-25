class IdeaRankCalculator {
  // 计算对象rank类
  constructor (weights, rate = 1) {
    // 各个指标的权重, 求和为1
    this.weights = weights
    // 不同值最终大小的差异, rate越大, 同样的差距, rank差距越大
    this.rate = rate
  }

  _logistic (x) {
    // logistic函数
    return 1 / (1 + Math.exp(-1 * this.rate * x))
  }

  getIdeasRank (ideas) {
    if (ideas.length <= 0) {
      return []
    }
    const rank = (new Array(ideas.length)).fill(0)
    // 归一化
    for (const metricType in this.weights) {
      // 平均值
      let mean = 0
      // 标准差
      let std = 0
      let data = new Array(ideas.length)
      for (let i = 0; i < data.length; i++) {
        const num = Number(ideas[i][metricType])
        data[i] = num
        mean += num
      }
      // 每个指标计算
      mean /= data.length
      for (let i = 0; i < data.length; i++) {
        const num = data[i] - mean
        std += num * num
      }
      if (std === 0) {
        data = (new Array(data.length)).fill(0.5)
      } else {
        std /= ideas.length
        data = data.map((ele, index) => {
          return this._logistic((ele - mean) / std)
        })
      }
      // 每个指标计算
      for (let i = 0; i < data.length; ++i) {
        rank[i] += data[i] * this.weights[metricType]
      }
    }
    // console.log('res')
    // console.log(rank)
    return rank
  }
}

export { IdeaRankCalculator }
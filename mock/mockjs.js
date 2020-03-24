import Mock from 'mockjs'
const Random = Mock.Random

Random.extend({
  bjdistrict (data) {
    var district = ['东城区', '西城区', '朝阳区', '丰台区', '石景山区', '海淀区', '门头沟区', '房山区', '通州区', '顺义区', '昌平区', '大兴区', '怀柔区', '平谷区', '密云区', '延庆区']
    return this.pick(district)
  }
})

export default Mock

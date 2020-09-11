<template>
<div id="myChart" :style="{ height: '300px'}"></div>
</template>
<script>
export default {
  name: 'hello',
  data () {
    return {
     
    }
  },
  mounted(){
    this.drawLine();
  },
  methods: {
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
           tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        left: 10,
        data: ['护肤', '服装', '食品', '厨具', '家居']
    },
    series: [
        {
            name: '商品信息',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '30',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                {value: 335, name: '护肤'},
                {value: 310, name: '服装'},
                {value: 234, name: '食品'},
                {value: 135, name: '厨具'},
                {value: 1548, name: '家居'}
            ]
        }
    ]
        });
    }
  }
}


  

</script>
const current = {
    state: {
        goodsInfo:{}
    },
    getters: {
    },
    mutations: {
      updateCurrentGoodsInfo(state,payload){
        state.goodsInfo = payload
      },
      removeCurrentGoodsInfo(state){
        state.goodsInfo = {}
      },
      setCurrentTrolley(state,payload){
        console.log("setCurrentTrolley",state,payload);
      }
    },
    actions:{
    }
}

export default current;
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
    let obj={}
    // if (event.collection == "bird_text"){
    //     return await db.collection("bird_text")
    //         .get()
    // } else if (event.collection == "major_work"){
    //     return await db.collection("major_work")
    //         .get()
    // }

    return await db.collection(event.collection)
        .get()
  
}
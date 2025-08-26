/*
Promise：TEST
 */
'use strict';
export class TestPromise {
  constructor() {
    // console.log(this.promiseAdd())
    // this.onPromiseAll(this.promiseAdd());
    this.onPromiseRace(this.promiseAdd());
  }

  promiseAdd() {
    const promiseList = [];
    const promise1 = new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    }).then(() => {
      console.log('promise1終わり')
    })

    promiseList.push(promise1);

    const promise2 = new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 3000);
    }).then(() => {
      console.log('promise2終わり')
    })

    promiseList.push(promise2);

    return promiseList;
  }

  //Promise.all
  // (全てのPromiseオブジェクトが完了したら次に進む)
  onPromiseAll(val) {
    Promise.all(val).then(() => {
      console.log('全部終わり');
    })
  }

  //Promise.Race
  // (どれか1つのPromiseオブジェクトが完了したら次に進む)
  onPromiseRace(val){
    Promise.race(val).then(()=>{
      console.log('どれか一つ終わったよ');
    })
  }
}
export default TestPromise;

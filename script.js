
const token = process.env.MY_TOKEN
let lastPrompt = '';
let url = `https://api.zhishuyun.com/midjourney/imagine?token=${token}`;
let image_id='';


// 全局监听键盘事件
document.addEventListener('keydown', function(event) {
  if (event.code === 'Enter' || event.keyCode === 13) {
    submitMessage();
  }
});

//按钮添加点击响应函数
function setOnclick() {
  
  var buttons = document.querySelectorAll(".row");

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
      console.log(this.id);

      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          'action': this.id,
          'image_id': image_id
        })
      };
      

      // 创建 loading 消息项并插入到聊天框中
      let loadingItem = document.createElement('div');
      loadingItem.className = 'chat-item';
      loadingItem.innerHTML = `
        <img src="./logo.png" alt="头像">
        <div class="content">图片正在生成中，请稍候...</div>
      `;
      

      let chatItems = document.querySelectorAll('.chat-item');
      let lastChatItem = chatItems[chatItems.length - 1];
      lastChatItem.after(loadingItem);

              // 找到最后一个聊天消息项并将新的响应消息插入到它的后面
        
          let totalHeight = 0;
          for (let i = 0; i < chatItems.length; i++) {
            totalHeight += chatItems[i].offsetHeight;
          }
          // 计算出聊天框的高度
          let chats = document.querySelector('.chats');
          let chatsHeight = chats.clientHeight;
          // 如果聊天框已经滚动到底部，就将它滚动到新添加的消息项的底部
          if ((totalHeight - chats.scrollTop) <= chatsHeight) {
            chats.scrollTop = chats.scrollHeight;
          }

      fetch(url, options)
        .then(response => response.json())
        .then(data => {
          lastPrompt = message
          const myData = data;
          image_id = myData.image_id;
          console.log(myData); // 输出保存的数据

          // 找到之前添加的提示消息项并将其替换为实际的响应消息
          let chatItems = document.querySelectorAll('.chat-item');
          let lastChatItem = chatItems[chatItems.length - 1];
          let responseItem = document.createElement('div');
          responseItem.className = 'chat-item';
          responseItem.innerHTML = `
            <img src="./logo.png" alt="头像">
            <div class="content"><img id="photo" src="${myData.image_url}" /><br>
              <div class="uv_button">
                <button id="upsample1" class="row">U1</button>
                <button id="upsample2" class="row">U2</button>
                <button id="upsample3" class="row">U3</button>
                <button id="upsample4" class="row">U4</button>
                <button class="row" onclick="refresh()">刷新</button>
                <button id="variation1" class="row">V1</button>
                <button id="variation2" class="row">V2</button>
                <button id="variation3" class="row">V3</button>
                <button id="variation4" class="row">V4</button>
              </div>
            </div>
          `;
          lastChatItem.replaceWith(responseItem);
          chats.scrollTop = chats.scrollHeight;
          setOnclick();
        })
        .catch(err => console.error(err));


    });
  }
}

// function submitMessage() {
//   let messageInput = document.getElementById('message');
//   message = messageInput.value;

//   if (message) {
//     let chats = document.querySelector('.chats');
//     let chatItem = document.createElement('div');

//     chatItem.className = 'chat-item right';
//     chatItem.innerHTML = `
//         <div class="content">${message}</div>
//         <img src="./mylogo.png" alt="头像">
        
//     `;

//     chats.appendChild(chatItem);
//     chats.scrollTop = chats.scrollHeight;
//     messageInput.value = '';

//     // 模拟接口请求
//     setTimeout(function() {
//       const options = {
//         method: 'POST',
//         headers: {
//           'content-type': 'application/json'
//         },
//         body: JSON.stringify({ 'prompt': message })
//       };

//       fetch('https://api.zhishuyun.com/midjourney/imagine?token=01b83f27f29e42a6820b42371e102620', options)
//         .then(response => response.json())
//         .then(data => {
//           lastPrompt = message
//           const myData = data;
//           console.log(myData); // 输出保存的数据

//           // 创建新的响应消息项
//           let responseItem = document.createElement('div');
//           responseItem.className = 'chat-item';
//           responseItem.innerHTML = `
//               <img src="./logo.png" alt="头像">
//               <div class="content"><img id = "photo" src="${myData.image_url}" /><br>
//                 <div class="uv_button">
//                   <button class="row">U1</button>
//                   <button class="row">U2</button>
//                   <button class="row">U3</button>
//                   <button class="row">U4</button>
//                   <button class="row" onclick="refresh()">刷新</button>
//                   <button class="row">V1</button>
//                   <button class="row">V2</button>
//                   <button class="row">V3</button>
//                   <button class="row">V4</button>
//                 </div>

              
//           `;

//           chats.appendChild(responseItem);
//           chats.scrollTop = chats.scrollHeight;
//         })
//         .catch(err => console.error(err));
//     }, 2000);
//   }
// }


function submitMessage() {
  let messageInput = document.getElementById('message');
  message = messageInput.value;

  if (message) {
    let chats = document.querySelector('.chats');
    let chatItem = document.createElement('div');

    chatItem.className = 'chat-item right';
    chatItem.innerHTML = `
        <div class="content">${message}</div>
        <img src="./mylogo.png" alt="头像">
        
    `;

    chats.appendChild(chatItem);
    chats.scrollTop = chats.scrollHeight;
    messageInput.value = '';

    // 模拟接口请求
    setTimeout(function() {
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ 'prompt': message })
      };

      // 创建一个新的聊天消息项来展示提示信息
      let loadingItem = document.createElement('div');
      loadingItem.className = 'chat-item';
      loadingItem.innerHTML = `
        <img src="./logo.png" alt="头像">
        <div class="content">图片正在生成中，请稍候...</div>
      `;
      chats.appendChild(loadingItem);
      chats.scrollTop = chats.scrollHeight;

      fetch(url, options)
        .then(response => response.json())
        .then(data => {
          lastPrompt = message
          const myData = data;
          image_id = myData.image_id;
          console.log(myData); // 输出保存的数据

          // 找到之前添加的提示消息项并将其替换为实际的响应消息
          let chatItems = document.querySelectorAll('.chat-item');
          let lastChatItem = chatItems[chatItems.length - 1];
          let responseItem = document.createElement('div');
          responseItem.className = 'chat-item';
          responseItem.innerHTML = `
            <img src="./logo.png" alt="头像">
            <div class="content"><img id="photo" src="${myData.image_url}" /><br>
              <div class="uv_button">
                <button id="upsample1" class="row">U1</button>
                <button id="upsample2" class="row">U2</button>
                <button id="upsample3" class="row">U3</button>
                <button id="upsample4" class="row">U4</button>
                <button class="row" onclick="refresh()">刷新</button>
                <button id="variation1" class="row">V1</button>
                <button id="variation2" class="row">V2</button>
                <button id="variation3" class="row">V3</button>
                <button id="variation4" class="row">V4</button>
              </div>
            </div>
          `;
          
          lastChatItem.replaceWith(responseItem);
          chats.scrollTop = chats.scrollHeight;
          setOnclick();
        })
        .catch(err => console.error(err));
    }, 200);
  }
}

// // 全局监听键盘事件
// document.addEventListener('keydown', function(event) {
//   if (event.code === 'Enter' || event.keyCode === 13) {
//     submitMessage();
//   }
// });



// function refresh() {
  
//   if (lastPrompt) {
//     const options = {
//       method: 'POST',
//       headers: {
//         'content-type': 'application/json'
//       },
//       body: JSON.stringify({ 'prompt': lastPrompt })
//     };

//     let loadingItem = document.createElement('div');
//       loadingItem.className = 'chat-item';
//       loadingItem.innerHTML = `
//         <img src="./logo.png" alt="头像">
//         <div class="content">图片正在生成中，请稍候...</div>
//       `;

//     fetch('https://api.zhishuyun.com/midjourney/imagine?token=01b83f27f29e42a6820b42371e102', options)
//       .then(response => response.json())
//       .then(data => {
//         const myData = data;
//         console.log(myData); // 输出保存的数据

//         // 创建新的响应消息项
//         let responseItem = document.createElement('div');
//         responseItem.className = 'chat-item';
//         responseItem.innerHTML = `
//           <img src="./logo.png" alt="头像">
//           <div class="content"><img id = "photo" src="${myData.image_url}" /><br>
//             <div class="uv_button">
//               <button class="row">U1</button>
//               <button class="row">U2</button>
//               <button class="row">U3</button>
//               <button class="row">U4</button>
//               <button class="row" onclick="refresh()">刷新</button>
//               <button class="row">V1</button>
//               <button class="row">V2</button>
//               <button class="row">V3</button>
//               <button class="row">V4</button>
//             </div>
//         `;

//         // 找到最后一个聊天消息项并将新的响应消息插入到它的后面
//         let chatItems = document.querySelectorAll('.chat-item');
//         let lastChatItem = chatItems[chatItems.length - 1];
//         lastChatItem.after(responseItem);
        
//         let totalHeight = 0;
//         for (let i = 0; i < chatItems.length; i++) {
//           totalHeight += chatItems[i].offsetHeight;
//         }
//         // 计算出聊天框的高度
//         let chats = document.querySelector('.chats');
//         let chatsHeight = chats.clientHeight;
//         // 如果聊天框已经滚动到底部，就将它滚动到新添加的消息项的底部
//         if ((totalHeight - chats.scrollTop) <= chatsHeight) {
//           chats.scrollTop = chats.scrollHeight;
//         }
//       })
//       .catch(err => console.error(err));
//   }
// }


function refresh() {
  if (lastPrompt) {
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ 'prompt': lastPrompt })
    };

    // 创建 loading 消息项并插入到聊天框中
    let loadingItem = document.createElement('div');
    loadingItem.className = 'chat-item';
    loadingItem.innerHTML = `
      <img src="./logo.png" alt="头像">
      <div class="content">图片正在生成中，请稍候...</div>
    `;
    

    let chatItems = document.querySelectorAll('.chat-item');
    let lastChatItem = chatItems[chatItems.length - 1];
    lastChatItem.after(loadingItem);

            // 找到最后一个聊天消息项并将新的响应消息插入到它的后面
      
        let totalHeight = 0;
        for (let i = 0; i < chatItems.length; i++) {
          totalHeight += chatItems[i].offsetHeight;
        }
        // 计算出聊天框的高度
        let chats = document.querySelector('.chats');
        let chatsHeight = chats.clientHeight;
        // 如果聊天框已经滚动到底部，就将它滚动到新添加的消息项的底部
        if ((totalHeight - chats.scrollTop) <= chatsHeight) {
          chats.scrollTop = chats.scrollHeight;
        }

    fetch(url, options)
      .then(response => response.json())
      .then(data => {
        const myData = data;
        console.log(myData); // 输出保存的数据

        // 创建响应消息项并将其替换为 loading 消息项
        let responseItem = document.createElement('div');
        responseItem.className = 'chat-item';
        responseItem.innerHTML = `
          <img src="./logo.png" alt="头像">
          <div class="content"><img id = "photo" src="${myData.image_url}" /><br>
              <div class="uv_button">
                <button id="upsample1" class="row">U1</button>
                <button id="upsample2" class="row">U2</button>
                <button id="upsample3" class="row">U3</button>
                <button id="upsample4" class="row">U4</button>
                <button class="row" onclick="refresh()">刷新</button>
                <button id="variation1" class="row">V1</button>
                <button id="variation2" class="row">V2</button>
                <button id="variation3" class="row">V3</button>
                <button id="variation4" class="row">V4</button>
            </div>
          </div>
        `;
        loadingItem.replaceWith(responseItem);
        setOnclick();
        let totalHeight = 0;
        for (let i = 0; i < chatItems.length; i++) {
          totalHeight += chatItems[i].offsetHeight;
        }
        
        let chats = document.querySelector('.chats');
        let chatsHeight = chats.clientHeight;
        if ((totalHeight - chats.scrollTop) <= chatsHeight) {
          chats.scrollTop = chats.scrollHeight;
        }
      })
      .catch(err => console.error(err));
  }

}

//按钮添加点击响应函数
// function setOnclick() {
//     var buttons = document.querySelectorAll(".row");

//     for (var i = 0; i < buttons.length; i++) {
//       buttons[i].addEventListener("click", function() {
//         console.log(this.id);

//         const options = {
//           method: 'POST',
//           headers: {
//             'content-type': 'application/json'
//           },
//           body: JSON.stringify({
//             'action': this.id,
//             'image_id': image_id
//           })
//         };
        

//         // 创建 loading 消息项并插入到聊天框中
//         let loadingItem = document.createElement('div');
//         loadingItem.className = 'chat-item';
//         loadingItem.innerHTML = `
//           <img src="./logo.png" alt="头像">
//           <div class="content">图片正在生成中，请稍候...</div>
//         `;
        

//         let chatItems = document.querySelectorAll('.chat-item');
//         let lastChatItem = chatItems[chatItems.length - 1];
//         lastChatItem.after(loadingItem);

//                 // 找到最后一个聊天消息项并将新的响应消息插入到它的后面
          
//             let totalHeight = 0;
//             for (let i = 0; i < chatItems.length; i++) {
//               totalHeight += chatItems[i].offsetHeight;
//             }
//             // 计算出聊天框的高度
//             let chats = document.querySelector('.chats');
//             let chatsHeight = chats.clientHeight;
//             // 如果聊天框已经滚动到底部，就将它滚动到新添加的消息项的底部
//             if ((totalHeight - chats.scrollTop) <= chatsHeight) {
//               chats.scrollTop = chats.scrollHeight;
//             }

//         fetch(url, options)
//           .then(response => response.json())
//           .then(data => {
//             lastPrompt = message
//             const myData = data;
//             image_id = myData.image_id;
//             console.log(myData); // 输出保存的数据

//             // 找到之前添加的提示消息项并将其替换为实际的响应消息
//             let chatItems = document.querySelectorAll('.chat-item');
//             let lastChatItem = chatItems[chatItems.length - 1];
//             let responseItem = document.createElement('div');
//             responseItem.className = 'chat-item';
//             responseItem.innerHTML = `
//               <img src="./logo.png" alt="头像">
//               <div class="content"><img id="photo" src="${myData.image_url}" /><br>
//                 <div class="uv_button">
//                   <button id="upsample1" class="row">U1</button>
//                   <button id="upsample2" class="row">U2</button>
//                   <button id="upsample3" class="row">U3</button>
//                   <button id="upsample4" class="row">U4</button>
//                   <button class="row" onclick="refresh()">刷新</button>
//                   <button id="variation1" class="row">V1</button>
//                   <button id="variation2" class="row">V2</button>
//                   <button id="variation3" class="row">V3</button>
//                   <button id="variation4" class="row">V4</button>
//                 </div>
//               </div>
//             `;
//             lastChatItem.replaceWith(responseItem);
//             chats.scrollTop = chats.scrollHeight;
//           })
//           .catch(err => console.error(err));


//       });
//     }
//   }
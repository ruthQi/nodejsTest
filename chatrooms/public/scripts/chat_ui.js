let socket = io.connect();
function divEscapedContentElement(message) {
   return $('<div></div>').text(message);
}

function divSystemContentElement(message){
   return $('<div></div>').html('<i>' + message + '</i>')
}

function processUserInput(chatApp, socket){
   let message = $('#send-message').val();
   let systemMessage;
   if(message.charAt(0) == '/'){
      systemMessage = chatApp.processCommand(message);
      if(systemMessage){
         $('#messages').append(divSystemContentElement(systemMessage));
      }
   }else{
      chatApp.sendMessage($('#room').text(), message);
      $('#messages').append(divEscapedContentElement(message));
      $('#messages').scrollTop($('#messages').prop('scrollHeight'));
   }
   $('#send-message').val('');
}

$(document).ready(()=>{
   let chatApp = new Chat(socket);
   socket.on('nameResult', (result)=>{
      let message;
      if(result.success){
         message = 'You are now known as ' + result.name + '.';
      }else{
         message = result.message
      }
      $('#messages').append(divSystemContentElement(message));
      $('#messages').scrollTop($('#messages').prop('scrollHeight'));
   });

   socket.on('joinResult', (result)=>{
      $('#room').text(result.room);
      $('#messages').append(divSystemContentElement('Room changed'));
      $('#messages').scrollTop($('#messages').prop('scrollHeight'));
   });

   socket.on('message', (message)=>{
      //let newElement = $('<div></div>').text(message.text);
      $('#messages').append(divEscapedContentElement(message.text));
      $('#messages').scrollTop($('#messages').prop('scrollHeight'));
   });
   socket.on('rooms', (rooms)=>{
      $('#room-list').empty();
      for(var room in rooms){
         //room = room.substring(0, room.length);
         if(room != ''){
            $('#room-list').append(divEscapedContentElement(room))
         }
      }
      $('#room-list div').click(function(){
         chatApp.processCommand('/join '+ $(this).text());
         $('#send-message').focus();
      })
   });
   setInterval(()=>{
      socket.emit('rooms');
   }, 1000);

   $('#send-message').focus();

   $('#send-form').submit(()=>{
      processUserInput(chatApp, socket);
      $('#send-message').focus();
      return false;
   })
})



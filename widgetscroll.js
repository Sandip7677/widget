function embedMyWidget() {
    document.addEventListener('DOMContentLoaded', function () {

    function getAllCandidate() {
        var model=document.getElementById("myModal");
        var className = model.className;
        var c=className.split(" ");
        
    var xhr = new XMLHttpRequest();
    xhr.open("GET", `https://stsytvmbgt.us-east-1.awsapprunner.com/chatgpt/getGeneratedArticalByBusinessId?businessId=${c[0]}`, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("authorization", c[1]);
  xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var responseData = JSON.parse(xhr.responseText);
        var finalRes = responseData.data;
        
        for (var i = 0; i < finalRes.length; i++) {
           var existingElement = document.getElementById('insertslid');
         var newSlide = document.createElement('div');
          newSlide.className = 'slide';
       var newModalData = document.createElement('div');
         newModalData.id = 'modalData';
         newModalData.innerHTML = addBoilerplate(finalRes[i].Campaign_Image,finalRes[i].Campaign_Title,finalRes[i].Campaign_Description);
         newSlide.appendChild(newModalData);
         existingElement.appendChild(newSlide);
        }
         
        openModal();
      
        console.log(finalRes,"custom html response");
      }
    };
    
  }
    var currentIndex = 0;
    var slides = document.querySelectorAll('.slider .slide');
    
    function showSlide(index) {
      if (index < 0) {
        currentIndex = 0;
      } else if (index >= 2) {
        currentIndex = 0;
      } else {
        currentIndex = index;
      }
  
      var translateValue = (-currentIndex * 100) ;
      document.querySelectorAll('.slide').forEach(function (item) {
        item.style.transform = 'translateX(' + translateValue + '%'+ ')';
      })
      
    }
    
    var prv = document.getElementById("prevBtn");
    prv.onclick = function() {
        showSlide(currentIndex - 1);
    };
    // function prevSlide() {
    //   showSlide(currentIndex - 1);
    // }
  

    var nxt = document.getElementById("nextBtn");
    nxt.onclick = function() {
        showSlide(currentIndex + 1);
    };
    
    // function nextSlide() {
    //   showSlide(currentIndex + 1);
    // }
  
  
  function addBoilerplate(url,Heading,Description) {
    // Boilerplate HTML code
    var boilerplate = "<!DOCTYPE html>" +
      "<html lang='en'>" +
      "<head>" +
      "<meta charset='UTF-8'>" +
      "<meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
      "<title>Your Page Title</title>" +
       '<link rel="preconnect" href="https://fonts.googleapis.com">'+
      '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'+
      '<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200&display=swap"rel="stylesheet">'+
      "<style>" +
      "body {font-family: 'Poppins', sans-serif;}" +
        "button {margin-bottom:10px}"+
         '.card {'+
              'transition: 0.3s;'+
              'width: 100%;'+
             ' border-radius: 5px;'+
              'display:flex;'+
          '}'+
  
         ' .container {'+
            '  padding: 2px 16px;'+
         ' }'+
         'img {'+
        'width: 100px;'+
        'height: auto;'+
       ' }'+
        'h2'+
        '{margin:5px 0;}'+
      "</style>" +
      "</head>" +
      "<body>" +
       '<div class="card">'+
    '<img src="'+url +'" alt="Avatar" style="width:200px">'+
    '<div class="container">'+
      '<h2><b>'+Heading+'</b></h2> '+
      '<p>'+Description+'</p> '+
   ' </div>'+
  '</div>'+
      "</body>" +
      "</html>";
  
    return boilerplate;
  }
  
  
  function openModal() {
      document.getElementById("myModal").style.display = "block";
      document.body.classList.add("blur-background");
    }
  

    var close = document.getElementById("closem");
    close.onclick = function() {
        document.getElementById("myModal").style.display = "none";
        document.body.classList.remove("blur-background");
    };
    // function closeModal() {
    //   document.getElementById("myModal").style.display = "none";
    //   document.body.classList.remove("blur-background");
    // }
  
    // window.onclick = function (event) {
    //   var modal = document.getElementById("myModal");
    //   if (event.target == modal) {
    //     closeModal();
    //   }
    // };
  
  
    getAllCandidate();

        
    });
}

embedMyWidget();




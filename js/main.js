



// ========== GLOBAL ==========
  let search = document.querySelector("header input");
  let main = document.querySelector(".main .container");
  const months = ["January","February","March","April","May","June","July", "August","September","October","November","December"];
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];



// ========== START ==========


  getData("cairo");

  search.addEventListener('input',function(){
    getData(this.value);
  });











// ========== FUNCTION ==========
  function date(x){
    return new Date(x);
  }

  async function getData(location){
    let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=f471866703c7498ca57152408230103&q=${location}&days=14`);
    let dataJson = await data.json();
    if(data.status == 200){
        display(dataJson);
    }
  };

  function display(dataJson){

    let result = "";
    result += `<div class="slide">
    <div class="box-one">
      <div class="section-head p-2 d-flex justify-content-between align-items-center">
          <span class="fs-15 lh-20 fw-400 text-p">${dayNames[date(dataJson.location.localtime).getDay()]}</span>
          <span class="fs-15 lh-20 fw-400 text-p">${months[date(dataJson.location.localtime).getMonth()]}</span>
      </div>
      <div class="section-body p-4">
          <h3 class="fs-20 lh-30 fw-400 text-p">${dataJson.location.name}</h3>
          <div class="section-two d-flex align-items-center justify-content-start">
              <h2 class="">${dataJson.current.temp_c}<sup>o</sup>C</h2>
              <div class="image">
                  <img class="w-100" src="https://${dataJson.current.condition.icon}" alt="">
              </div>
          </div>
          <h3 class="fs-15 lh-20 fw-300 text-main">${dataJson.current.condition.text}</h3>
          <div class="section-four d-flex">
              <div class="d-flex py-2 pe-2">
                  <div class="image">
                      <img src="./image/icon-umberella.png" alt="">
                  </div>
                  <span class="fs-15 lh-20 fw-300 text-p ms-2">${dataJson.forecast.forecastday[0].day["daily_chance_of_rain"]}%</span>
              </div>
              <div class="d-flex py-2 px-2">
                  <div class="image">
                      <img src="./image/icon-wind.png" alt="">
                  </div>
                  <span class="fs-15 lh-20 fw-300 text-p ms-2">${dataJson.current.wind_mph}Km/h</span>
              </div>
              <div class="d-flex py-2 px-2">
                  <div class="image">
                      <img src="./image/icon-compass.png" alt="">
                  </div>
                  <span class="fs-15 lh-20 fw-300 text-p ms-2">${dataJson.current.wind_dir}</span>
              </div>
          </div>
      </div>
  </div>
  </div>`;


  for(let i=1 ; i<dataJson.forecast.forecastday.length-1 ; i+=2){

    
    result +=`<div class="slide">
    <div class="box-two h-100">
      <div class="section-head p-2 text-center">
          <span class="d-block fs-15 lh-20 fw-400 text-p">${dayNames[date(dataJson.forecast.forecastday[i].date).getDay()]}</span>
      </div>
      <div class="section-body p-4">
          <div class="image">
              <img class="w-100" src="https://${dataJson.forecast.forecastday[i].day.condition.icon}" alt="">
          </div>
          <h2 class="fs-25 lh-40 fw-700 text-white text-center">${dataJson.forecast.forecastday[i].day.maxtemp_c}<sup>o</sup>C</h2>
          <p class="fs-15 lh-25 fw-300 text-white text-center">${dataJson.forecast.forecastday[i].day.mintemp_c}<sup>o</sup></p>
          <h3 class="fs-15 lh-20 fw-300 text-main text-center">${dataJson.forecast.forecastday[i].day.condition.text}</h3>
      </div>
  </div>
  </div>
  <div class="slide">
    <div class="box-three h-100">
      <div class="section-head p-2 text-center">
          <span class="d-block fs-15 lh-20 fw-400 text-p">${dayNames[date(dataJson.forecast.forecastday[i+1].date).getDay()]}</span>
      </div>
      <div class="section-body p-4">
          <div class="image">
              <img class="w-100" src="https://${dataJson.forecast.forecastday[i+1].day.condition.icon}" alt="">
          </div>
          <h2 class="fs-25 lh-40 fw-700 text-white text-center">${dataJson.forecast.forecastday[i+1].day.maxtemp_c}<sup>o</sup>C</h2>
          <p class="fs-15 lh-25 fw-300 text-white text-center">${dataJson.forecast.forecastday[i+1].day.mintemp_c}<sup>o</sup></p>
          <h3 class="fs-15 lh-20 fw-300 text-main text-center">${dataJson.forecast.forecastday[i+1].day.condition.text}</h3>
      </div>
  </div>
  </div>`;
  };



  main.innerHTML = `<div class="responsive">${result}</div>`;
  resp();
  

  };

  function resp(){
    $('.main .responsive').slick({
      dots: false,
      infinite: false,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 3,
      arrows:false,
      adaptiveHeight:true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  };
// ========== VALIDATION ==========




  
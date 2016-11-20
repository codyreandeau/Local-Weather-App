    function getWeather(){
        document.write("weather");
        $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=London&APPID=ee6596241130f193adf1ba90e625cc10",function(json){
            document.write(JSON.stringify(json));
        });
    }

var header = document.createElement('div')
header.className='header'
var h1=document.createElement('h1')
h1.innerHTML="Predict nationality with name";

var container = document.querySelector('.container')

header.append(h1)
container.append(header)

var inputGroup = document.createElement('div')
inputGroup.className='input-group'
var inputGroupMb = document.createElement('div')
inputGroupMb.className='input-group mb-3'
var inputTag = document.createElement('input')
inputTag.className='form-control'
inputTag.setAttribute('type','text');
inputTag.setAttribute('id','name')
inputTag.setAttribute('placeholder','eg: arun');
inputTag.setAttribute('aria-label',"Recipient's username");
inputTag.setAttribute('aria-describedby','basic-addon2');
var search = document.createElement('div')
search.className='input-group-append'
var button = document.createElement('button')
button.className='btn btn-outline-secondary'
button.setAttribute('type','button');
button.innerHTML="search";

search.append(button)

var gap=document.createElement('BR')

inputGroupMb.append(inputTag,search)
inputGroup.append(inputGroupMb)
container.append(gap)
container.append(inputGroup)
var gap1=document.createElement('BR')
container.append(gap1)

let mainDiv;
let noDataTag;

//async function with await and fetch
async function getDetails(name) {
    try{
        let res = await fetch("https://api.nationalize.io/?name=" + name);// nationalize API
        let data = await res.json();
        console.log(res)
        let countries=data.country;
        if(res.status!==200){
            let alert3 = document.querySelector('.alert')
            let divError2=document.createElement('div')
            divError2.innerHTML=`<div class="alert alert-danger" role="alert">
            Some error occurred, Please contact IT Support/ Try after sometime
            </div>`
            alert3.append(divError2)
            //clearInterval(counter);
            var counter=setTimeout(()=>{
                divError2.remove()
            },3000)
        }
        console.log(data)
        let countriesDetails= await fetch("https://raw.githubusercontent.com/rvsp/restcountries-json-data/master/res-countries.json");//To get country information
        let countryInformation = await countriesDetails.json()
        //console.log(countryInformation)
        //Selecting top 2
        if(countries && countries.length>0){
            mainDiv=document.createElement("div");
            mainDiv.className='mainDiv';
            let nameTag = document.createElement("h3");
            nameTag.innerHTML = `<b>NAME:&nbsp;</b>${name}`
            mainDiv.append(nameTag)
            var gap2=document.createElement('BR')
            mainDiv.append(gap2)
            var row=document.createElement('div')
                row.className='row'
            countries.slice(0, 2).forEach(element => {
                let CountryDetail = countryInformation.filter((country)=>country.alpha2Code===element.country_id)
                console.log(CountryDetail)
                console.log(element.country_id)
                console.log(element.probability)
                
                
                var article1=document.createElement('article')
                article1.className='card fl-left'
                var section1=document.createElement('section')
                section1.className='card-coun'
                var span1=document.createElement('span')
                span1.className='country'
                var gap3=document.createElement('BR')
                span1.innerHTML=CountryDetail[0].name;
                var span2=document.createElement('span')
                span2.className='country'
                span2.innerHTML=element.country_id;
                section1.append(span1,gap3,span2)
                var section2=document.createElement('section')
                section2.className='card-cont'
                var h3=document.createElement('h3')
                h3.innerHTML='Probability'
                var divEvent=document.createElement('div')
                divEvent.className='even-info'
                var p1=document.createElement('p')
                p1.innerHTML=element.probability.toFixed(10)
                var p2=document.createElement('p')
                p2.innerHTML=element.probability.toFixed(2)*100 +'%'
                divEvent.append(p1,p2)
                
                section2.append(h3,divEvent)
                article1.append(section1,section2)
                row.append(article1)
                mainDiv.append(row)
                
            });
            container.append(mainDiv)
        }
        else{
            noDataTag = document.createElement('h3')
            noDataTag.innerHTML=`<b>No Data, Please search another name or valid name</b>`
            container.append(noDataTag)
        }
        console.log(res.name)
    }
    catch(err){
        console.log('Error occurred ',err);
        let alert2 = document.querySelector('.alert')
            let divError1=document.createElement('div')
            divError1.innerHTML=`<div class="alert alert-danger" role="alert">
            Some error occurred, Please contact IT Support/ Try after sometime
        </div>`
        alert2.append(divError1)
        //clearInterval(counter);
        var counter=setTimeout(()=>{
            divError1.remove()
        },3000)
    }
}

//button click event
button.addEventListener('click', (event) => {
    process()

});

//enter event
inputTag.addEventListener('keypress', (event) => {
    if (event.key === "Enter") {
        process()
    }

});

//on change event to clear details
inputTag.addEventListener('change', function(){
    if(mainDiv){
        mainDiv.remove()
    }
    if(noDataTag){
        noDataTag.remove()
    }
});

//process function after click or enter
let process = ()=>{
    let name=document.getElementById('name').value;
    if(name){
        console.log("test",name)
        getDetails(name)
    }
    else{
        console.log("Please enter some details")
        
        let alert1 = document.querySelector('.alert')
            let divError=document.createElement('div')
            divError.innerHTML=`<div class="alert alert-warning" role="alert">
            Please enter some name to click on search
        </div>`
        alert1.append(divError)
        //clearInterval(counter);
        var counter=setTimeout(()=>{
            divError.remove()
        },3000)

    }
  }


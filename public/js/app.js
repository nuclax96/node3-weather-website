const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.getElementById('message-1')
const message2 = document.getElementById('message-2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()  
    const location= search.value
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
        {   message1.innerHTML=data.error
            console.log(data.error);
        }else{
            message1.textContent=data.location
            message2.textContent=data.forecast

            console.log(data.location)
            console.log(data.forecast)
        }
        })
    })
    
})
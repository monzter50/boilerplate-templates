export const saludo = () => {console.log("hola mundo")}

export const getNumbers=()=>{
   let createSelect;
   const select = document.querySelector("#rooms");
   select.addEventListener("change", () => {
       console.log("hice el evento")
       var e = document.getElementById("rooms");
       clear();
       let elementValue = e.options[e.selectedIndex].value;
       console.log(elementValue);
       for (let i = 0; i < elementValue; i++) {
            createSelect = document.createElement('select');
             createSelect.setAttribute("name", `adults-${i+1}`);
            createSelect.innerHTML =`<option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>`;
           createSelect.className = 'input--number input--primary';
           document.querySelector("#adults").appendChild(createSelect);
          
       }
        for (let i = 0; i < elementValue; i++) {
              createSelect = document.createElement('select');
              createSelect.setAttribute("name", `children-${i+1}`);
              createSelect.innerHTML = `<option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>`;
              createSelect.className = 'input--number input--primary';
              document.querySelector("#children").appendChild(createSelect);

          }
   });

  
}
 const clear =()=> {
    let d = document.getElementById("adults");
    let c = document.getElementById("children");
    c.innerHTML = "";
    d.innerHTML = "";

 }
 export const sendEmail =(e)=>{
     e.preventDefault();
     console.log("click")
     let form = document.querySelector('form'),
         formArray = Array.from(form),
         data = {}
     const loading = document.querySelector('.send-form')
     loading.disabled = true
     loading.classList.add('sending-form')
     formArray.map(input => data[input.name] = input.value)
      const settings = {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      }
      console.log('Settings')
      console.log(settings.body)
      fetch('', settings)
          .then(function (res) {
              return res.json()
          })
          .then(function (data) {

              console.log(data)
          })
          .catch(err => {
              console.log(err)
          })
 }

 
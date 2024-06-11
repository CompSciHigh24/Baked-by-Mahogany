const form = document.querySelector("form")

form.addEventListener("submit", (e)=>{
  e.preventDefault()
  const itemData = new FormData(form)
  const reqBody = Object.fromEntries(itemData)
  console.log(reqBody)
  fetch("/add", {
    method: "POST",
    body: JSON.stringify(reqBody),
    headers: { "Content-type": "application/json; charset=UTF-8" }
  })
  .then((response) => {
    console.log("POST request sent")
    // location.href = "/"
  })
})
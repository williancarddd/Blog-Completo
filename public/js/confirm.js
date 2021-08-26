
function confirm_delete(eevent, element) {
  eevent.preventDefault()
  const result_confirm = confirm("do you really want to delete?")
  
  console.log(eevent, element)
  if(result_confirm){
    element.submit()
  } else {
    alert("not deleted.")
  }
}
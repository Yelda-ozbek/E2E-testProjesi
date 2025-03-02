import { use, useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Form, FormFeedback, FormGroup, Input,Label } from "reactstrap";


const initialValues = {
    ad:"",
    soyad:"",
    email:"",
    password:"",
};
const errorMessages =  {
    ad:"En az 3 karakter giriniz.",
    soyad:"En az 3 karakter giriniz.",
    email:"Geçerli bir e-mail adresi giriniz.",
    password:"En az 10 karakter içermelidir.",
};
export default function Register(){
    const [formData,setFormData] = useState(initialValues);
    const [errors,setErros] = useState({   ad:"",
    soyad:false,
    email:false,
    password:false,})
    const [isValid,setIsValid] = useState(false);
    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };
      let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;

      useEffect(()=> {
        if(formData.ad.trim.length>=3 && formData.soyad.trim.length>=3 && validateEmail(formData.email)&& regex.test(formData.password)){
            setIsValid(true);}
            else{
                setIsValid(false);
            }
        
      },[formData])
    const handleChange = (event)=> {
        const {name,value} =  event.target;
        setFormData({...formData,[name]: value})
        if(name==="ad" ||  name==="soyad" ) {
            if(value.trim().length >= 3) {
                setErros({...errors,[name]:false })
            }else {
                setErros({...errors,[name]:true })
            }
        }
        if(name==="email"){
            if(validateEmail(value)){
                setErros({...errors,[name]:false });
            } else {
                setErros({...errors,[name]:true })
            }

        }
        if(name==="password"){
          if(regex.test(value)){
            setErros({...errors,[name]:false });
          }else {
            setErros({...errors,[name]:true })
          }
        }
    }
    const handleSubmit = (event)=> {
        event.preventDefault();
        if(!isValid) return;
    }
    return (
     
        <Card>
            <CardHeader>
KAYIT OL
</CardHeader>
            <CardBody>
    <>
   <Form onSubmit={handleSubmit}>
  <FormGroup>
    <Label for="ad">
     Ad:
    </Label>
    <Input
      id="ad"
      name="ad"
      placeholder="Adınızı Giriniz"
      type="text"
      onChange={handleChange}
      value={formData.ad}
      invalid={errors.ad}
    />
    {errors.ad && 
     <FormFeedback>
     {errorMessages.ad}
    </FormFeedback>}
  </FormGroup>
  <FormGroup>
    <Label for="soyad">
     Soyad:
    </Label>
    <Input
      id="soyad"
      name="soyad"
      placeholder="Soyadınızı Giriniz"
      type="text"
      onChange={handleChange}
      value={formData.soyad}
      invalid={errors.soyad}
    />
     {errors.soyad && 
     <FormFeedback>
     {errorMessages.soyad}
    </FormFeedback>}
  </FormGroup>
  <FormGroup>
    <Label for="email">
     Eamil:
    </Label>
    <Input
      id="email"
      name="email"
      placeholder="Emailinizi Giriniz"
      type="email"
      onChange={handleChange}
      value={formData.email}
      invalid={errors.email}
    />
     {errors.email && 
     <FormFeedback>
     {errorMessages.email}
    </FormFeedback>}
  </FormGroup>
  <FormGroup>
    <Label for="password">
      Password
    </Label>
    <Input
      id="password"
      name="password"
      placeholder="Şifre seçiniz"
      type="password"
      onChange={handleChange}
      value={formData.password}
      invalid={errors.password}
    />
     {errors.password && 
     <FormFeedback>
     {errorMessages.password}
    </FormFeedback>}
  </FormGroup>
  <Button disabled={!isValid}>
   Kayıt Ol
  </Button>
</Form>
    </>

    </CardBody>
    </Card>
    )

}
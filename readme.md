# Bookstore RESTful API.

Develop a RESTful API for a bookstore that allows a user to login, perform user related tasks, view a list of books and place book orders.

## Run Bookstore RESTful API command.

```bash
docker-compose up --build
```
_**set postman for test**_

* set body to **raw**
* change type to **JSON**

_**port for test**_

* [http://localhost:3000/login](http://localhost:8080/login) 
    * type : post
    * input : { "username" : "" , "password" : "" }


* [http://localhost:3000/user](http://localhost:8080/user) 
    * type : get
    * input : {}


* [http://localhost:3000/user](http://localhost:8080/user) 
    * type : post
    * input : { "username" : "" , "password" : "" , "date_of_birth" , "" }


* [http://localhost:3000/user/order](http://localhost:8080/user/order) 
    * type : post
    * input : { "order" : [] }


* [http://localhost:3000/delete](http://localhost:8080/delete) 
    * type : delete
    * input : {}

_**phpmyadmin**_ 
* port : [http://localhost:8080](http://localhost:8080)
* user : root
* password : admin@2021

_**ER diagram**_

[![image](https://lh3.googleusercontent.com/jmmiOJAw2RXe6cLJEqcUNeB651qdxTu3_m80zrofKs1wCx89xcEoBoMPsVFu7Wa6Sn1rbiyh7oWX2FqGoyBKLsTFjoyH3TfcSnQyhSIFkKEtZH568ChdOktJP8mXTf9Z1eZhQCijxLkWVOFe76llJC7krTvADRB8HTEGe578t7vMw8Ef3BH9TD2SJKf4Ajmginf93BKSEdboV_aXvrpnBJKuku38XD-ZFrf0Xu048nsC1UnCy0khpjk3Us3Vjl_TY5qIbEy-kZg3hsWYhmKHfD8yFrQ13W_qQ3wUV8UfeIlsyK2t_gkIwA0hgSnj1yTkAS9SRDDaJpxtXAk_hcPE0NO6NYW-0veYgZWYq_A9yHiizBptmH_RuZ9n96h4_5Z2X5Dmt07YYEWHTPx3qBr_ARAqIuoI3bRSmYCTvMQe_-Z148d2ikiVGisRCh7KgJdew6THvAhv-LJzlYURMLKB8ZCO_PZiau8K_8m-aKPQrOw3FGA6x6uJ7nRrXeT7W_l9Kia_I6KHNpa5JbOujyyUhQKwE4nl_jkWYO6tDaks3mnDGtFSTHZ25mt5IBgQcskavFUXyFS1f9PLXa4re8DaGRp02vqR2znFP6TlV8YCIuYPaYETAVcGNtytTqjDvwLBuLbfCCDI4moWbpHJ6QVCyqJwcqNWX_l6-0b-os8r5t7tay66yH_Vp2JWt-nG31QcObQYZAWK9W1heE5Ml3mn0zs=w599-h160-no?authuser=0)]





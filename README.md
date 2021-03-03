# FORM APP - ANGULAR

#### **1.  Docker Image**
I build the image docker: docker build -t ernestoagc/form-app:0.1 .

also you can download these version on 
docker pull ernestoagc/form-app:0.1

#### **2. Running frontend application**
I going to use a docker container, to create this we can do with this command:
docker run -p 8082:80 -d  --network form-net  --name=app-ueat ernestoagc/form-app:0.1

Finally, we can use the application with the url: http://localhost:8082/

![](https://i.imgur.com/RAc13O2.jpg)


#### **3. Enter to the system**
First, we need to run the back end application (https://github.com/ernestoagc/form-api) and use this credentials. username=alonso ; password=123456
![](https://i.imgur.com/Bi3tR9C.jpg)

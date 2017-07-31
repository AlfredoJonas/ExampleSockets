#!/usr/bin/env python
 
#importamos el modulo para trabajar con sockets
import socket
 
#Creamos un objeto socket para el servidor. Podemos dejarlo sin parametros pero si 
#quieren pueden pasarlos de la manera server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s = socket.socket()

#Nos conectamos al servidor con el metodo connect. Tiene dos parametros
#El primero es la IP del servidor y el segundo el puerto de conexion
s.connect(("190.204.43.12", 1801))
#s.connect(("192.168.0.101", 9999)) 
#Creamos un bucle para retener la conexion 
while True:
    #Instanciamos una entrada de datos para que el cliente pueda enviar mensajes
    mensaje = input("Mensaje a enviar >> ")

    #Con la instancia del objeto servidor (s) y el metodo send, enviamos el mensaje introducido
    s.send(mensaje)
 
    #Si el mensaje es close cerramos la conexion
    if mensaje == "close":
        break


    recibido = s.recv(1024)

    print("El servidor dice: "+recibido)
 
#Cerramos la instancia del objeto servidor
s.close()
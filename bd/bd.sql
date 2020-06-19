DROP SCHEMA IF EXISTS `restoapi` ;
CREATE SCHEMA IF NOT EXISTS `restoapi` ;

USE restoapi;

-- PRODUCT TABLES
DROP TABLE IF EXISTS `restoapi`.`product_type` ;
CREATE TABLE IF NOT EXISTS  `restoapi`.`product_type` (
 product_type_id BIGINT NOT NULL AUTO_INCREMENT,
 product_type VARCHAR (150) NOT NULL,
 PRIMARY KEY (product_type_id)   
);

INSERT INTO  product_type VALUES (null, 'Pizza'),
								 (null, 'Lomo'),
								 (null, 'Hamburguesa'),             
								 (null, 'Agua'),
              					 (null, 'Gaseosas'),
								(null, 'Guarnición');

DROP TABLE IF EXISTS `restoapi`.`product` ;
CREATE TABLE IF NOT EXISTS  `restoapi`.`product` (
 product_id BIGINT NOT NULL AUTO_INCREMENT,
 product VARCHAR (300) NOT NULL,
 price FLOAT NOT NULL,
 picture VARCHAR (500) NOT NULL,
 product_type_id BIGINT NOT NULL,
 PRIMARY KEY (product_id),
 FOREIGN KEY (product_type_id) REFERENCES product_type (product_type_id)
);

INSERT INTO product VALUES (NULL , 'Mozarella', 300, 'https://www.laespanolaaceites.com/wp-content/uploads/2019/06/pizza-con-tomate-albahaca-y-mozzarella-1080x671.jpg', 1),
 (NULL , 'Napolitana', 350, 'https://milrecetas.net/wp-content/uploads/2017/09/tipos-de-pizza-0.jpg', 1),
 (NULL , 'Especial', 450, 'https://www.barilochense.com/suplementos/pizzeria-la-farinata/fotos/51136.jpg', 1),
 (NULL , 'Lomo Simple', 400, 'https://betos.com.ar/wp-content/uploads/2019/08/Lomo.png', 2),
 (NULL , 'Lomo Completo ', 450, 'https://dqzrr9k4bjpzk.cloudfront.net/images/1589172/1028567712.jpg', 2),
 (NULL , 'Hamburguesa de Carne', 300, 'https://cdn2.cocinadelirante.com/sites/default/files/images/2018/09/receta-super-facil-de-carne-para-hamburguesa-suave.jpg',3),
 (NULL , 'Hamburguesa de Pollo', 300, 'https://cdn2.cocinadelirante.com/sites/default/files/styles/gallerie/public/images/2019/01/como-hacer-carne-para-hamburguesa-de-pollo.jpg',3), 
 (NULL , 'Saborizada Naranja', 120, 'https://statics.dinoonline.com.ar/imagenes/full_600x600_ma/3040225_f.jpg', 4),
 (NULL , 'Saborizada Pera', 120, 'https://statics.dinoonline.com.ar/imagenes/full_600x600_ma/3040222_f.jpg', 4),
 (NULL , 'Natural', 100, 'https://mizaki.mx/wp-content/uploads/2017/08/ciel-600x600.png', 4),
 (NULL , 'Coca Cola', 100, 'https://i7.pngguru.com/preview/328/478/357/world-of-coca-cola-soft-drink-papua-new-guinea-the-coca-cola-company-coca-cola-bottle-png-image.jpg', 5),
 (NULL , 'Fanta', 100, 'https://www.pngitem.com/pimgs/m/242-2428652_fanta-png-free-images-fanta-plastic-bottle-png.png', 5);




-- USER TABLES
DROP TABLE IF EXISTS `restoapi`.`role` ;
CREATE TABLE IF NOT EXISTS  `restoapi`.`role` (
 role_id BIGINT NOT NULL AUTO_INCREMENT,
 role VARCHAR (150) NOT NULL,
 PRIMARY KEY (role_id)   
);

INSERT INTO role VALUES (null, 'admin'),
				 (null, 'client');
				


DROP TABLE IF EXISTS `restoapi`.`province` ;
CREATE TABLE IF NOT EXISTS  `restoapi`.`province` (
 province_id BIGINT NOT NULL AUTO_INCREMENT,
 province VARCHAR (150) NOT NULL,
 PRIMARY KEY (province_id)   
);

INSERT INTO province VALUES (null, 'Cordoba'),
                    (null, 'Santa Fe'),                  
				 (null, 'Buenos Aires');
				

	


DROP TABLE IF EXISTS `restoapi`.`user` ;
CREATE TABLE IF NOT EXISTS  `restoapi`.`user` (
 `user_id` BIGINT NOT NULL AUTO_INCREMENT,
 `username` VARCHAR (300) NOT NULL,
 `name` VARCHAR (300) NOT NULL,
 `lastname` VARCHAR (300) NOT NULL,
 `email` VARCHAR (300) NOT NULL,
 `address` VARCHAR (300) NOT NULL,
 `password` VARCHAR (100) NOT NULL,
 `province_id` BIGINT NOT NULL,
 `role_id` BIGINT NOT NULL,
 PRIMARY KEY (`user_id`),
 FOREIGN KEY (`province_id`) REFERENCES `province` (`province_id`),
 FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`)
);


INSERT INTO `user` VALUES (NULL, 'admin', 'Ana', 'Gaetan', 'anahi@hotmail.com', 'Roma 675', 'Ad1023MinN', 1, 1),
(NULL, 'pablog', 'Pablo', 'Gonzales', 'pablogonzales@gmail.com', 'Sarmiento 5555','pedrog1986', 1, 2),
(NULL, 'marianlala', 'Mariana', 'Gomez', 'mariag@hotmail.com', 'Florida 980', 'mari1736', 2, 2),
(NULL, 'oscarlala', 'Oscar', 'Robledo', 'oscarrob@hotmail.com', '25 de Mayo 657', 'lordStarK4857', 2, 2),
(NULL, 'agustiina', 'Agustina', 'Rodriguez', 'agus123456@hotmail.com', 'Roca 1657', '408583922', 3, 2),
(NULL, 'ezequiell', 'Eze', 'Funez', 'caballeroszodiaco@hotmail.com', 'Palermo 435', 'mayonesa', 3, 2);
 
 


-- ORDER TABLES

DROP TABLE IF EXISTS `restoapi`.`payment` ;
CREATE TABLE IF NOT EXISTS  `restoapi`.`payment` (
 payment_id BIGINT NOT NULL AUTO_INCREMENT,
 payment VARCHAR (150) NOT NULL,
 PRIMARY KEY (payment_id)   
);

INSERT INTO  payment VALUES (null, 'Tarjeta'),
				 (null, 'Efectivo');


DROP TABLE IF EXISTS `restoapi`.`order_status` ;
CREATE TABLE IF NOT EXISTS  `restoapi`.`order_status` (
 `order_status_id` BIGINT NOT NULL AUTO_INCREMENT,
 `order_status` VARCHAR (150) NOT NULL,
 PRIMARY KEY (`order_status_id`)   
);

INSERT INTO  `order_status`  VALUES (null, 'Confirmado'),
				 (null, 'En preparacion'),
                 (null, 'En camino'),
                 (null, 'Entregado');



DROP TABLE IF EXISTS `restoapi`.`order` ;
CREATE TABLE IF NOT EXISTS  `restoapi`.`order` (
 `order_id` BIGINT NOT NULL AUTO_INCREMENT,
 `total` FLOAT NOT NULL,
 `datetime` DATETIME NOT NULL,
 `user_id` BIGINT NOT NULL,
 `order_status_id` BIGINT NOT NULL,
 `payment_id` BIGINT NOT NULL,
 PRIMARY KEY (`order_id`),
 FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
 FOREIGN KEY (`order_status_id`) REFERENCES `order_status` (`order_status_id`),
 FOREIGN KEY (`payment_id`) REFERENCES `payment` (`payment_id`)
);

DROP TABLE IF EXISTS `restoapi`.`order_detail` ;
CREATE TABLE IF NOT EXISTS  `restoapi`.`order_detail` (
 `order_detail_id` BIGINT NOT NULL AUTO_INCREMENT,
 `quantity` INT NOT NULL,
 `product_id` BIGINT NOT NULL,
 `order_id` BIGINT NOT NULL,
 PRIMARY KEY (`order_detail_id`),
 FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
 FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`) 
);

INSERT INTO `order` VALUES (NULL, 700.00, '2020-03-05 20:15:00', 2, 1, 1),
							(NULL, 1450.00, '2020-03-05 21:29:36', 3, 1, 2);
INSERT INTO `order_detail` VALUES (NULL, 2, 1, 1),
									(NULL, 1, 10, 1),
									(NULL, 2, 4, 2),
									(NULL, 1, 5, 2),
									(NULL, 2, 11, 2);



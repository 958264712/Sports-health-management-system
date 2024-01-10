# Host: localhost  (Version: 5.5.53)
# Date: 2022-07-02 16:26:39
# Generator: MySQL-Front 5.3  (Build 4.234)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "dormitory"
#

DROP TABLE IF EXISTS `dormitory`;
CREATE TABLE `dormitory` (
  `d_id` int(11) NOT NULL AUTO_INCREMENT,
  `d_address` varchar(255) NOT NULL DEFAULT '',
  `d_type` varchar(255) NOT NULL DEFAULT '',
  `d_rent` varchar(255) NOT NULL DEFAULT '',
  `d_status` varchar(255) NOT NULL DEFAULT '',
  `d_floor` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`d_id`)
) ENGINE=MyISAM AUTO_INCREMENT=51 DEFAULT CHARSET=utf8;

#
# Data for table "dormitory"
#

/*!40000 ALTER TABLE `dormitory` DISABLE KEYS */;
INSERT INTO `dormitory` VALUES (1,'503','4','600','已满','5'),(2,'203','2','1000','已满','2'),(3,'104','3','800','已满','1'),(4,'206','3','800','未满','2'),(5,'601','2','1000','未满','6'),(6,'602','4','600','未满','6'),(7,'302','4','600','已满','3'),(8,'102','2','1000','已满','1'),(9,'402','3','800','已满','4'),(10,'606','3','800','未满','6'),(11,'423','3','800','未满','4'),(12,'413','3','800','未满','4'),(13,'613','3','800','未满','6'),(14,'612','4','1000','未满','6'),(15,'312','2','1000','未满','3'),(16,'121','2','1000','未满','1'),(18,'111','2','1000','未满','1'),(19,'101','2','1000','未满','1'),(20,'520','2','1000','未满','5'),(21,'330','2','1000','未满','3'),(22,'520','2','1000','已满','5'),(24,'511','2','1000','未满','5'),(25,'310','2','1000','未满','3'),(26,'214','2','1000','未满','2'),(27,'207','2','1000','未满','2'),(28,'315','2','1000','未满','3'),(29,'415','2','1000','未满','4'),(30,'115','2','1000','未满','1'),(31,'313','2','1000','未满','3'),(32,'517','2','1000','未满','5'),(33,'417','2','1000','未满','4'),(34,'317','2','1000','未满','3'),(35,'217','2','1000','未满','2'),(36,'117','2','1000','未满','1'),(37,'316','2','1000','未满','3'),(38,'216','2','1000','未满','2'),(39,'122','2','1000','未满','1'),(40,'122','2','1000','未满','1'),(41,'122','2','1000','未满','1'),(42,'122','2','1000','未满','1'),(43,'122','2','1000','未满','1'),(47,'0','0','0','0','0'),(48,'0','0','0','0','0'),(49,'616','2','1000','未满','6'),(50,'','','','','');
/*!40000 ALTER TABLE `dormitory` ENABLE KEYS */;

#
# Structure for table "floor"
#

DROP TABLE IF EXISTS `floor`;
CREATE TABLE `floor` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `f_name` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

#
# Data for table "floor"
#

/*!40000 ALTER TABLE `floor` DISABLE KEYS */;
INSERT INTO `floor` VALUES (1,'一楼'),(2,'二楼'),(3,'三楼'),(4,'四楼'),(5,'五楼'),(6,'六楼');
/*!40000 ALTER TABLE `floor` ENABLE KEYS */;

#
# Structure for table "manager"
#

DROP TABLE IF EXISTS `manager`;
CREATE TABLE `manager` (
  `m_id` int(11) NOT NULL AUTO_INCREMENT,
  `m_username` varchar(255) NOT NULL DEFAULT '',
  `m_password` varchar(255) NOT NULL DEFAULT '',
  `m_name` varchar(255) NOT NULL DEFAULT '',
  `m_gender` varchar(255) NOT NULL DEFAULT '',
  `m_age` int(11) NOT NULL DEFAULT '0',
  `m_phone` varchar(255) NOT NULL DEFAULT '',
  `m_img` varchar(255) DEFAULT '',
  PRIMARY KEY (`m_id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

#
# Data for table "manager"
#

/*!40000 ALTER TABLE `manager` DISABLE KEYS */;
INSERT INTO `manager` VALUES (1,'liuwei','123','刘威','男',18,'13712312344','https://img1.baidu.com/it/u=707277512,3397525217&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'),(2,'zengxiqin','123','曾茜琴','女',18,'13712341234','https://img1.baidu.com/it/u=3808594592,850527289&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'),(3,'shuaiwu','123','帅武','男',18,'13712345123','https://img1.baidu.com/it/u=1960292808,1761809160&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'),(4,'wangzuo','123','王左','男',18,'13712312312','https://img2.baidu.com/it/u=3345560664,1020889760&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'),(5,'zhengweiwei','123','郑伟伟','男',18,'13701230123','https://img0.baidu.com/it/u=3365573645,2073973856&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500');
/*!40000 ALTER TABLE `manager` ENABLE KEYS */;

#
# Structure for table "tenant"
#

DROP TABLE IF EXISTS `tenant`;
CREATE TABLE `tenant` (
  `t_id` int(11) NOT NULL AUTO_INCREMENT,
  `t_name` varchar(255) NOT NULL DEFAULT '',
  `t_phone` varchar(255) NOT NULL DEFAULT '',
  `t_age` int(11) NOT NULL DEFAULT '0',
  `t_gender` varchar(255) NOT NULL DEFAULT '',
  `t_ifPet` varchar(255) NOT NULL DEFAULT '',
  `t_address` varchar(255) NOT NULL DEFAULT '',
  `t_floor` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`t_id`)
) ENGINE=MyISAM AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;

#
# Data for table "tenant"
#

/*!40000 ALTER TABLE `tenant` DISABLE KEYS */;
INSERT INTO `tenant` VALUES (1,'刘一','12345678901',18,'男','否','501','5'),(2,'曾二','12345678905',18,'女','是','202','2'),(3,'肖大','12345678985',18,'女','是','205','2'),(4,'一一','12334678985',18,'女','是','601','6'),(5,'帅五','13334678985',18,'男','是','501','5'),(6,'王四','13334673985',18,'男','是','401','4'),(7,'郑六','13334673975',18,'男','是','301','3'),(8,'胡七','13224673975',18,'男','否','401','4'),(9,'陈久','13224673975',18,'男','否','101','1'),(10,'陈大','13224673935',18,'男','是','121','1'),(11,'杨八','13224673935',18,'男','否','511','5'),(12,'文三','13224673935',18,'男','否','611','6'),(13,'文三','13324673935',18,'男','否','611','6'),(15,'刘三','12324673935',18,'男','否','601','6'),(16,'刘四','12324673935',18,'男','否','601','6'),(17,'刘四','12324673935',18,'男','否','601','6'),(18,'刘四','12324673935',18,'男','否','601','6'),(19,'刘四','12324673935',18,'男','否','511','5'),(20,'刘四','12324673935',18,'男','否','211','2'),(21,'刘四','12324673935',18,'男','否','311','3'),(22,'刘四','12324673935',18,'男','否','501','5'),(23,'刘四','12324673935',18,'男','否','520','5'),(24,'刘四','12324673935',18,'男','否','101','2'),(25,'刘四','12324673935',18,'男','否','310','3'),(26,'刘四','12324673935',18,'男','否','210','2'),(27,'刘四','12324673935',18,'男','否','310','3'),(28,'刘四','12324673935',18,'男','否','405','4'),(29,'刘四','12324673935',18,'男','否','205','2'),(30,'刘四','12324673935',18,'男','否','110','1'),(31,'刘四','12324673935',18,'男','否','205','2'),(33,'刘四','12324673935',18,'男','否','405','4'),(35,'ad','1234567890',22,'男','是','111','1'),(36,'大茜','13752141523',22,'女','是','111','1'),(37,'小琴','12345678901',18,'女','是','205','2');
/*!40000 ALTER TABLE `tenant` ENABLE KEYS */;

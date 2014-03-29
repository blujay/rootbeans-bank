
/*
 * GET home page.
 */

exports.index = function(req,res){
	res.render('index', { title : 'Rootbeans Beanbank'});
};

exports.userlist = function(db) {
    return function(req, res) {
        var collection = db.get('usercollection');
        collection.find({},{},function(e,docs){
            res.render('userlist', {
                "userlist" : docs
            });
        });
    };
};

exports.newuser = function(req, res){
  res.render('newuser', { title: 'Add New User' });
};

exports.adduser = function(db) {
    return function(req, res) {

        // Get our form values. These rely on the "name" attributes
        var userName = req.body.username;
        var userEmail = req.body.useremail;

        // Set our collection
        var collection = db.get('usercollection');

        // Submit to the DB
        collection.insert({
            "username" : userName,
            "email" : userEmail
        }, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // If it worked, set the header so the address bar doesn't still say /adduser
                res.location("userlist");
                // And forward to success page
                res.redirect("userlist");
            }
        });

    }
}

exports.beanbaglist = function(db) {
    return function(req, res) {
        var collection = db.get('beanbag');
        collection.find({},{},function(e,docs){
            res.render('beanbaglist', {
                "beanbaglist" : docs
            });
        });
    };
};

exports.newbeanbag = function(req,res){
	res.render('newbeanbag', { title : 'Add New Beanbag!'});
};

exports.addbeanbag = function(db) {
    return function(req, res) {

        // Get our form values. These rely on the "name" attributes
        var beanbagname = req.body.beanbagname;

        // Set our collection
        var collection = db.get('beanbag');

        // Submit to the DB
        collection.insert({
            "beanbagname" : beanbagname
        }, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // If it worked, set the header so the address bar doesn't still say /adduser
                res.location("beanbaglist");
                // And forward to success page
                res.redirect("beanbaglist");
            }
        });

    }
}


exports.beanlist = function(db){
	return function(req, res){
		var collection = db.get('beans');
		collection.find({},{},function(e,docs){
			res.render('beanlist', {
				"beanlist" : docs
			});
		});
	};
};

exports.newbean = function(req,res){
	res.render('newbean', { title : 'Add New Bean!'});
};


exports.addbean = function(db) {
    return function(req, res) {

        // Get our form values. These rely on the "name" attributes
        var beanbag = req.body.beanbag;
        var value = req.body.value;

        // Set our collection
        var collection = db.get('beans');

        // Submit to the DB
        collection.insert({
            "beanbag" : beanbag,
            "value" : value
        }, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // If it worked, set the header so the address bar doesn't still say /adduser
                res.location("beanlist");
                // And forward to success page
                res.redirect("beanlist");
            }
        });

    }
}
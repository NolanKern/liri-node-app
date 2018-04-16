console.log('this is loaded');

exports.twitter = {
  consumer_key: 'KwHRJL5obnWqFQSKoRdYgMLhI',
  consumer_secret: 'LofNjTBVqGVyidacNB3W50wjLl3QnUuM1AJA8whO4dGP7Ch5aX',
  access_token_key: '981630859693273088-tshv2skyKXPCJwAdKKrSSJ3IzzECnWH',
  access_token_secret: '3wqwYIh68R1FtOebUEjr7RcoKQNnmY4L2FYDiXGLqYG1E'
};


exports.spotify = {
  id: 'b47ee6d16fcc4228949bda6f65921b6b',
  secret: 'd2c62c5eb9d047748c3785f954feed05'
};

spotify.search({ type: 'track', query: 'The Sign' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
   console.log(data); 
   });
import React from 'react';

const Clarifai = ({ imageUrl }) => {
    const raw = JSON.stringify({
        "user_app_id": {
              "user_id": "faelz123",
              "app_id": "bde08dc3962740359fa6a62646a494ec"
          },
        "inputs": [
          {
            "data": {
              "image": {
                "url": {imageUrl}
              }
            }
          }
        ]
      });
      
      const requestOptions = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Key 8e22e23b2dcc46db993d7c63e18e5823'
        },
        body: raw
      };
}


export default Clarifai;
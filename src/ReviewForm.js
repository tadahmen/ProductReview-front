import React from 'react';
import jQuery from 'jquery';

class ReviewForm extends React.Component {
  constructor() {
    super();
  }

  createReview(event) {
    event.preventDefault();

    let component = this;   //?misschien in dit geval niet nodig, probeer wat gebeurt als verderop bij '.done', 'this' staat
    let productId= this.props.productId;

    // let review = {
    //   name: this.refs.newReviewInputName.value,
    //   rating: this.refs.newReviewInputRating.value,
    //   reviewText: this.refs.newReviewInputText.value
    // }
    // console.log("review is:" + review)

    let name= this.refs.newReviewInputName.value;
    let rating= parseInt(this.refs.newReviewInputRating.value);
    let reviewText= this.refs.newReviewInputText.value;
    console.log("productId is:" + productId);    //to check
    console.log("rating is:" + rating * 20);
    console.log("name is:" + name);
    console.log("reviewText is:" + reviewText);

    let newReview = {     //deze tussenstap is nodig om zeker te weten dat de nieuwe input wordt weggeschreven in de ajax request
                          //bij react gebeuren dingen asynchroom, dus als je 'Forminput' laat wegschrijven in de ajaxrequest
                          //zou het kunnen dat deze nog niet is geupdate met de nieuwe inputgegevens maar dat de vorige gegevens er nog instaan (lege strings)
                          //hier dwing je react a.h.w. om de gegevens te updaten.
      id: null,              //?? moet id null zijn om het mogelijk te maken dat er een id aan wordt toegekend in de db?
      name: name,
      rating: rating,    //rating: rating,
      reviewText: reviewText
    }
    console.log("newReview is:" + newReview)
    console.log("newReview.id is:" + newReview.id)
    console.log("newReview.rating is:" + newReview.rating)  //to check if rating is understood as an integer
    console.log("newReview.name is:" + newReview.name)
    console.log("newReview.reviewText is:" + newReview.reviewText)

    jQuery.ajax({
      type: "POST",
      url:`https://salty-reef-21530.herokuapp.com/products/${productId}/reviews.json`,
      data: JSON.stringify({
        review: newReview
      }),                             //het object is {review: {id: null, name: "somename", rating: anInteger, reviewText: someText}}
                                      //zijn namen gelijk aan db namen in back-end?
                                      //zijn datatypen gelijk aan db datatypen in de back-end?
      contentType: "application/json",
      dataType: "json"
    })
      .done(function(data) {
        component.props.onChange(); //hierdoor wordt de reviewlijst op het scherm geupdate
        component.refs.newReviewInputName.value = ""; //deze regels zijn om de opgenomen waarden van het formulier weer leeg te maken
                                                      //anders zou 'review: newreviews' (hierboven) door de asynchromiteit
                                                      //bij de volgende input alsnog de oude waarden kunnen opnemen
        component.refs.newReviewInputRating.value = "";  //?maybe this can't be an empty string (because datatype is integer)
        component.refs.newReviewInputText.value = "";
      })
      .fail(function(error) {
        console.log(error)
      });
  }



render() {
  return(
    <div>
        <form onSubmit={this.createReview.bind(this)}>
              <input type="text" ref="newReviewInputName" placeholder="name" />
              <br/><br/>
              <input type="string" ref="newReviewInputRating" placeholder="rate it (scale 1-5)" />
              {/*<table>    //dit hele deel is om rating via radio buttons te doen, maar werkt niet goed
                <th>
                  <td></td><td> 1 </td><td> 2 </td><td> 3 </td><td> 4 </td><td> 5 </td>
                </th>
                <tbody>
                  <tr>
                    <td>rate it:</td>
                    <td><input type="radio" ref="newReviewInputRating" name="rating" value="1"/></td>
                    <td><input type="radio" ref="newReviewInputRating" name="rating" value="2"/></td>
                    <td><input type="radio" ref="newReviewInputRating" name="rating" value="3"/></td>
                    <td><input type="radio" ref="newReviewInputRating" name="rating" value="4"/></td>
                    <td><input type="radio" ref="newReviewInputRating" name="rating" value="5"/></td>
                  </tr>
                </tbody>
              </table>*/}
              <br/>
              <textarea ref="newReviewInputText" placeholder="write a review" /> {/*?maybe this should have an end tag*/}
              <button type="submit">submit</button>
        </form>
      </div>
    );
  }
}

export default ReviewForm;

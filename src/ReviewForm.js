import React from 'react';
import jQuery from 'jquery';

class ReviewForm extends React.Component {
  constructor() {
    super();
  }

  createReview(event) {
    event.preventDefault();

    let component = this;   //?misschien in dit geval niet nodig, probeer wat gebeurt als verderop bij '.done', 'this' staat

    let name= this.refs.newReviewInputName.value;
    let rating= this.refs.newReviewInputRating.value;
    let reviewText= this.refs.newReviewInputText.value;
    let productId= this.props.productId;
    console.log("product_id is:" + productId);
    console.log("rating is:" + rating);
    rating = 4;
    let newReview = {     //deze tussenstap is nodig om zeker te weten dat de nieuwe input wordt weggeschreven in de ajax request
                          //bij react gebeuren dingen asynchroom, dus als je 'Forminput' laat wegschrijven in de ajaxrequest
                          //zou het kunnen dat deze nog niet is geupdate met de nieuwe inputgegevens maar dat de vorige gegevens er nog instaan (lege strings)
                          //hier dwing je react a.h.w. om de gegevens te updaten.
      id: null,   //?waarom null?
      name: name,
      rating: rating,
      reviewText: reviewText,
      product_id: productId
    }

    jQuery.ajax({
      type: "POST",
      url:`http://localhost:5000/products/${productId}/reviews.json`,
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify({
        review: newReview
      })
    })
      .done(function(data) {
        component.props.onChange(); //hierdoor wordt de reviewlijst op het scherm geupdate
        component.refs.newReviewInputName.value = ""; //deze regels zijn om de opgenomen waarden van het formulier weer leeg te maken
                                                      //anders zou 'review: newreviews' (hierboven) door de asynchromiteit bij de volgende input alsnog de oude waarden kunnen opnemen
        component.refs.newReviewInputRating.value = "";  //?maybe this can't be an empty string
        component.refs.newReviewInputReviewText.value = "";
        component.props.productId = "";  //?maybe this can't be an empty string
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
              <table>
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
              </table>
              <br/>
              <textarea ref="newReviewInputText" placeholder="write a review" /> {/*?maybe this should have an end tag*/}
              <button type="submit">submit</button>
        </form>
      </div>
    );
  }
}

export default ReviewForm;

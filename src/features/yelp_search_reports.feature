Feature: Report results information

	In order to see results reports
	System has to print specific results data
	to the console.

	Considerations due to difference of Yelp actual behavior with Coding Challenge scenario:
	- In Step 10, click and expand is not valid for list elements. In order to see business data, either 
	the business name or 'read more' link have to be clicked. As both links take to the same
	page, the automated scenario is clicking on business name.

	Background: 
		Given I open the url "https://www.yelp.com"
		When User selects Restaurants in the drop-down box in Find
		And User appends Pizzas in the Find search field
		And User clicks on "Search" button
		Then A list of restaurants is displayed		

	Scenario: Report on Search Results Page
		Then Console reports total number of Search results with number of results in the current page
		And Console reports the star rating of each of the results in the first result page

	Scenario: Report critical information of a search result
		When User clicks on the name of restaurant 1
		Then Business profile is opened 
		And Console reports critical information of the restaurant

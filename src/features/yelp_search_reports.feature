Feature: Report results information

	In order to see results reports
	System has to print specific results data
	to the console.

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

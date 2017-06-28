Feature: Search

	In order to see business pages
	Users should be able to perform a search
	using keywords and filters.

	Background: 
		Given I open the url "https://www.yelp.com"


	Scenario Outline: User searches a restaurant
		When User selects <category> in the drop-down box in Find
		And User appends <search_text> in the Find search field
		And User clicks on "Search" button
		Then A list of restaurants is displayed

		Examples:
			| category    | search_text |
			| Restaurants | Pizza       | 



	Scenario: User applies filters
		When User selects Restaurants in the drop-down box in Find
		And User appends Pizza in the Find search field
		And User clicks on "Search" button
		And A list of restaurants is displayed
		And User applies filter values
			 | Price 	| Category 	|
			 | $		| Italian 	|
			 | $$		| Pizza 	|


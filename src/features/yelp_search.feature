Feature: Search

	In order to see business pages
	Users should be able to perform a search
	using keywords and filters.

	Considerations due to difference of Yelp actual behavior with Coding Challenge scenario:
	- Step 3 no longer applies, after doing Step 2 the page automatically searches
	- Step 3 has to be added after Step 4 as Search button needs to be clicked after adding text
	
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
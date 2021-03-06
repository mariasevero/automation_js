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
    When I select <category>
    And I add <search_text> to the search
    And I click on "Search" button
    Then A list of restaurants is displayed

    Examples:
      | category    | search_text |
      | Restaurants | Pizza       | 

  Scenario: User applies filters
    When I select Restaurants
    And I add Pizza to the search
    And I click on "Search" button
    And A list of restaurants is displayed
    And I apply filters
       | Price  | Category  |
       | $      | Italian   |
       | $$     | Pizza     |
Feature: Search business and view business information

  In order to see business pages and their information
  I should be able to perform a search using keywords 
  and filters, and then open the desired business page.

  Considerations due to difference of Yelp actual behavior with Coding Challenge scenario:
  - Step 3 no longer applies, after doing Step 2 the page automatically searches
  - Step 3 has to be added after Step 4 as Search button needs to be clicked after adding text
  - In Step 10, click and expand is not valid for list elements. In order to see business data, either 
  the business name or 'read more' link have to be clicked. As both links take to the same
  page, the automated scenario is clicking on business name.
  
  Background: 
    Given I open the url "https://www.yelp.com"

  Scenario Outline: I search a restaurant
    When I select <category>
    And I add <search_text> to the search
    And I click on "Search" button
    Then A list of restaurants is displayed

    Examples:
      | category    | search_text |
      | Restaurants | Pizza       | 

  Scenario: I apply filters
    When I select Restaurants
    And I add Pizza to the search
    And I click on "Search" button
    And A list of restaurants is displayed
    And I apply filters
       | Price  | Category  |
       | $      | Italian   |
       | $$     | Pizza     |
    And I click on the name of restaurant 1
    Then Business profile is opened 

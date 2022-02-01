#Commands to run the app
```
npm ci #installs node modules
npm start
```
Additional Questions:

How long did you spend on the coding test? What would you add to your solution if you had more time?
```
I worked on the challenge for 10 hours approximately. 

If I had more time, I would like to do either of the following options;
1. If modifying the backend services is allowed, firstly, I would add a couple of services in the backend that returns the list of states and districts avilabale without any exposing any other details to the user. Secondly, I would return the data/ history paramter as a JSON array (in the services with endpoints #/districts, #/districts/:ags/history/cases, #/districts/:ags/history/incidence, etc), which would be more readable than the current structure and maintain unique hierarchy of JSON object to return cases or incidence history. I would also remove the duplication of certain records in the history parameter of districts and services with duplication of information.

2. If these services cannot be modified, then I would design a middleware to post process the response from actual backend and return the response to the front-end in desired format as mentioned in the above, so that the processing logic of response is not done at the front-end.
```
What alternative approaches/solutions to the user story did you consider when engineering your solution? What benefits/downsides would they have had compared to the selected solution?
```
The current logic at front-end handles the post processing of response to return the data in a consistent manner to facilitate the rendering of visuals. This actually causes a load on the front-end system which effects the performance of the application and slows it down.
Carrying out the processing logic at the backend or at a middleware level as feasible, reduces the processing load on front-end systems which might be having a challenging environment in terms of processor, memory, internet bandwidth capabilities.

When designing the components, I tried to breakdown the funtionality as much as possible so that new components(such as a header, footer, etc) can be easily added to the App component which could be common throughout the application. Any other additional functionality like cases summary can be displayed in Home Page without affecting existing components or the functionality. Designing components in a loosely coupled fashion allows easy maintainability and addition of new features to the application.

The common functionality is written separately in utils folder to enable reusability and provide a single point of action to make any modifications in the future.
```
What additional features/improvements do you think could help the customer gain more value from your application?
```
The current application displays the plots to the user based on 3 levels (namely country, state or districts) and also allows the user to request the plots for past few days in addition to these levels. The plots generated are interactive, which can be downloaded, shared or can be further filtered to particular intervals thorugh the controls provided on the top-right section of each plot, when hovered on it.

In addition to it, summary information provided in the meta parameter of responses from the services used can be displayed in the application for a better understanding of the current scenario of the Covid-19 cases.

```
Where do you see issues in your code that might cause issues in the future? How would you monitor the performance of your app?
```
Rather than writing the functions as inner functions, writing them outside the functional component facilitates code reusability, debugging and running the test scripts.
Currently the test scripts are not included in the application, as it was already discussed in the call previously that I didn't had the experience of writing automation scripts and I'm working on it.

```
How would you improve the API that you just used or its documentation?
```
As mentioned in the answer to the first question I would add a couple of services to return the list of states and districts avilabale without any exposing any other details to the user. And, I would return the data/ history paramter as a JSON array and maintain consistency in the response structure.  I will remove the duplication of information in the service responses. I would also specify the ranges for the request parameters (Example: days parameter) in the technical design document for the API
```
What did you think about this test? How interesting was it for you? How would you recommend us to improve the test?
```
The test is exciting and challenging at the same time and allows one to consider the architecture, best practices in a designing an efficient system and writing a code that is mainatainable, reusable, etc.
I think that the test is designed in a way to evaluate all these factors.
```




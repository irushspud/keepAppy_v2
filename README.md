# keepAppy
Group Programming Project

####Backend Application
 * 'cd keepAppy'
 * 'cd apiKeepAppy'
 * 'rake db:create'
 * 'rake db:migrate'
 * 'rails s;'

If you check out the 'README.md' inside the backend folder.It will provide you with information about the routes and the setup of the application.


####Frontend Application
* 'cd keepAppy'
* 'cd frontend'
* 'ionic serve' : Ru app in a browser
* 'ionic emulate ios' : Emuslate on iOS

####Temporary Node.js API
* 'cd keepAppy'
* 'cd api'
* 'node app.js'

This api when running will provides you with samle routes with dummy information for quotes and articles.
This was used in the development process.

#####Expanation of Tags
	When a users completes the mood checker his results are matched to tags.
	These are queried in the api url using the route /articles/?tags="tag1,tag2,tag3".
	This will return any article/quote which contains any of these tags up to a limit of 5 (from each Articles and Quotes)

	##List of Tags
	depression
	sad
	fun
	walks
	happiness
	Acheiving goals
	Trying new things
	Eating well
	Hydration
	Stress Management
	Socialising
	Energy
	Motivation
	Feeling Sad
	Improving sleep
	Time management
	Healthy breakfast
	Making time to exercise
## can be found at morning.json and evening.json 
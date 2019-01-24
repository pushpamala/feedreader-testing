/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('url defined for each feed item', function() {
            allFeeds.forEach(item => {
                expect(item.url).toBeDefined();
                expect(item.url).not.toBe('');
            });
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('name property defined for each feed item', function() {
            allFeeds.forEach(item => {
                expect(item.name).toBeDefined();
                expect(item.name).not.toBe('');
            });
        });
    });


    /* A new test suite named "The menu" */

    /* A test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
    describe('The menu', function() {
        it('menu element hidden by default', function() {
            let bodyEl = document.querySelector('body');
            expect(bodyEl.classList).toContain('menu-hidden');
        });

         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
         it('menu changes visibility on click', function() {
            let bodyEl = document.querySelector('body');
            let menuEl = document.querySelector('.menu-icon-link');
            menuEl.click();
            expect(bodyEl.classList).not.toContain('menu-hidden');
            menuEl.click();
            expect(bodyEl.classList).toContain('menu-hidden');

         });
    });

    /* A new test suite named "Initial Entries" */
    describe('Initial Entries', function() {            

        let oldFeedHtml = '';
        let nextFeedIndex = 1;
        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            let feedEl = document.querySelector('.feed');
            oldFeedHtml = feedEl.innerHTML;
            feedEl.innerHTML = '';
            loadFeed(nextFeedIndex, function() {
                nextFeedIndex += 1;
                done();
            });
        });

        it('loadFeed has atleast one entry element', function() {
            let entryEl = document.querySelector('.feed .entry');
            expect(entryEl).toBeDefined();
         });
    });     

    /* A new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        let oldFeedHtml = '';
        let newFeedIndex = 2;
        beforeEach(function(done) {
            let feedEl = document.querySelector('.feed');
            oldFeedHtml = feedEl.innerHTML;
            feedEl.innerHTML = '';
            loadFeed(newFeedIndex, function() {
                done();
            });
        });
        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        it('loading new Feed changes the content', function() {
            let feedEl = document.querySelector('.feed');
            expect(feedEl.innerHTML).not.toEqual(oldFeedHtml);
         });
    });    
}());

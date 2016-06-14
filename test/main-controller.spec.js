describe('MainController', function () {

    beforeEach(function () {
        module('app');
    });

    beforeEach(inject(function ($controller) {
        controller = $controller('MainController');
    }));

    describe('Main controller creation', function () {
        it('should be created successfully', function () {
            expect(controller).to.be.defined;
        });
    });

    describe('Pagination params', function () {
        it('startAt should be equal 1', function () {
            expect(controller.paginationParams.startAt).to.be.equal(1);
        });

        it('maxResults should be equal 20', function () {
            expect(controller.paginationParams.maxResults).to.be.equal(20);
        });
    });
});
import { TestBed, inject } from '@angular/core/testing';
import { DbService } from './db.service';
describe('DbService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [DbService]
        });
    });
    it('should be created', inject([DbService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=C:/Users/Malte/Dokumente/neighbor-trade/angular-src/src/src/app/services/db.service.spec.js.map
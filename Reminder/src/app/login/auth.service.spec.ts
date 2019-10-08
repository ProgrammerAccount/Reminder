import { TestBed } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";

import { AuthService } from "./auth.service";
import {
  HttpTestingController,
  HttpClientTestingModule
} from "@angular/common/http/testing";

describe("AuthService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule,HttpClientModule]
    })
  );

  it("should be created", () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});

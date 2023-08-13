import { Injectable,Logger } from '@nestjs/common';

@Injectable()
export class ReviewService {
    private readonly logger = new Logger(ReviewService.name);

  getHello(): string {
    return 'Hello World!';
  }



  review(data: any) {
  console.log('review service :  request comming from task service...'); 
  console.log('before update :',data);
  data.request.review = true; // Update the review field inside the request object
  console.log('after update ...', data);
   
}


}

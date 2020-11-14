import { Module } from '@nestjs/common';
import { CoffeesModule } from 'src/coffees/coffees.module';
import { CoffeRatingService } from './coffe-rating.service';

@Module({
  imports: [
    CoffeesModule
  ],
  providers: [CoffeRatingService]
})
export class CoffeRatingModule { }

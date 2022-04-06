import { UseGuards } from '@nestjs/common';
import {
    Args,
    Mutation,
    Parent,
    Query,
    ResolveField,
    Resolver,
} from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';
import { CustomerService } from 'src/services/customer.service';
import { ProductsService } from 'src/services/products.service';
import { PurchasesService } from 'src/services/purchases.service';
import { CreateProductInput } from '../inputs/create-product-input';
import { Customer } from '../models/customer';
import { Product } from '../models/product';

@Resolver(() => Customer)
export class CustomersResolver {
    constructor(
        private customersService: CustomerService,
        private purchasesService: PurchasesService,
    ) {}

    @UseGuards(AuthorizationGuard)
    @Query(() => Customer)
    me(@CurrentUser() user: AuthUser) {
        return this.customersService.getCustomerByAuthUserId(user.sub);
    }

    @ResolveField()
    purchases(@Parent() customer: Customer) {
        return this.purchasesService.listAllFromCustomer(customer.id);
    }
}

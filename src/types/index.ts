export enum NODE_ENV {
    DEVELOPMENT = "development",
    PRODUCTION = "production",
    TEST = "test"
}

export type ReturnValue<T = unknown> = {
    data: T,
    error: any,
    success: boolean,
    message: string
}

export type ReturnValueWithPagination<T = []> = {
    data: {
        data: T[],
        total: number,
        page: number,
        limit: number
    },
    error: any,
    success: boolean,
    message: string
}

export enum FileType {
    VIDEO = 'VIDEO',
    IMAGE = 'IMAGE',
    PDF = 'PDF',
    DOC = 'DOC',
    XLS = 'XLS',
    ZIP = 'ZIP',
    OTHER = 'OTHER',
    AUDIO = 'AUDIO',
}

export const productStatus = {
    1: "ACTIVE",
    2: "INACTIVE",
    3: "DISCONTINUED",
    4: "PENDING_APPROVAL",
    5: "ARCHIVED",
} as const;

export const productStatusKeys = {
    "ACTIVE": 1,
    "INACTIVE": 2,
    "DISCONTINUED": 3,
    "PENDING_APPROVAL": 4,
    "ARCHIVED": 5,
} as const;

// eslint-disable-next-line
export type ProductStatus = (typeof productStatus)[keyof typeof productStatus];

export const StockStatus = {
    1: "OUT_OF_STOCK",
    2: "IN_STOCK",
} as const;

// eslint-disable-next-line
export type StockStatus = (typeof StockStatus)[keyof typeof StockStatus];

export const DefaultCurrency = 'AED' as const;

export const DiscountStrategy = {
    BULK_PRODUCT: 'BULK_PRODUCT',
    COUPON: 'COUPON'
};

export const BulkDiscountStrategy = {
    OVERRIDE: 'OVERRIDE',
    STACK: 'STACK',
    SKIP_EXISTING: 'SKIP_EXISTING'
};

export const ConditionType = {
    MINIMUM_PURCHASE: 'MINIMUM_PURCHASE',
    CART_QUANTITY: 'CART_QUANTITY',
    PRODUCT_CATEGORY: 'PRODUCT_CATEGORY',
    USER_GROUP: 'USER_GROUP',
    FIRST_PURCHASE: 'FIRST_PURCHASE',
    TIME_OF_DAY: 'TIME_OF_DAY',
    DAY_OF_WEEK: 'DAY_OF_WEEK'
};

export const ConditionOperator = {
    EQUALS: 'EQUALS',
    GREATER_THAN: 'GREATER_THAN',
    GREATER_THAN_EQUAL: 'GREATER_THAN_EQUAL',
    LESS_THAN: 'LESS_THAN',
    LESS_THAN_EQUAL: 'LESS_THAN_EQUAL',
    IN: 'IN',
    NOT_IN: 'NOT_IN',
    BETWEEN: 'BETWEEN'
};

export const DiscountType = {
    PERCENTAGE: 'PERCENTAGE',
    FIXED_AMOUNT: 'FIXED_AMOUNT',
    BUY_X_GET_Y: 'BUY_X_GET_Y',
    FREE_SHIPPING: 'FREE_SHIPPING'
};

export const PlaceHolderImage = 'images/placeholder-image.jpg'

export type UserDeviceDetails = {
    'user-agent': string
    'device-type': string
    os: string
    browser: string
    version: string
}
import {Construct} from 'constructs'
import {Stack, StackProps} from 'aws-cdk-lib'
import { AttributeType, ITable, Table } from 'aws-cdk-lib/aws-dynamodb';
import { getSuffixFromStack } from '../Utils';

export class DataStack extends Stack {
    public readonly spacesTable: ITable
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);
        const suffix = getSuffixFromStack(this);

        // create a dynameodb table
        const table = new Table(this, 'SpacesTable', {
            partitionKey: {
                name: 'id',
                type: AttributeType.STRING
            },
            tableName: `SpacesTable-${suffix}`

        })
        this.spacesTable = table
    }
}
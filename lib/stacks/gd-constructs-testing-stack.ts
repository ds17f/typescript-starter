import * as cdk from "aws-cdk-lib";
import { GDStack, GDStackProps } from "@gd-safeguard/godaddy-constructs";
import * as standards from "@gd-safeguard/godaddy-constructs/lib/standards";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

export class GdConstructsTestingStack extends GDStack {
  constructor(scope: Construct, id: string, props: GDStackProps) {
    super(scope, id, props);

    const vpc = this.gdTrustedLandingZone.networking.vpc;

    // 👇 lambda function definition
    const lambdaFunction = new lambda.Function(
      this,
      "lambda-function",
      standards.functionProps({
        runtime: lambda.Runtime.NODEJS_16_X,
        memorySize: 1024,
        timeout: cdk.Duration.seconds(5),
        handler: "index.main",
        code: lambda.Code.fromInline("print 'hello world'"),
        environment: {
          REGION: cdk.Stack.of(this).region,
          AVAILABILITY_ZONES: JSON.stringify(
            cdk.Stack.of(this).availabilityZones
          ),
        },
      })
    );
  }
}

import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const chapter04 = new aws.iam.Role("chapter04", {
    assumeRolePolicy: aws.iam.assumeRolePolicyForPrincipal(aws.iam.Principals.LambdaPrincipal),
});

new aws.lambda.Function("chapter04", {
    name: "chapter04-function",
    handler: "app.lambda_handler",
    runtime: aws.lambda.Runtime.Python3d12,
    role: chapter04.arn,
    code: new pulumi.asset.AssetArchive({
        ".": new pulumi.asset.FileArchive("./function/src"),
    }),
});

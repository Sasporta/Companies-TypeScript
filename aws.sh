###############################################################
# variables
###############################################################
export securityGroup=sg-0942d9992e09d18b7
export subnet1=subnet-0bd95b448c3c8ad31
export subnet2=subnet-081e7ed3d09fa16ef
export clusterName=hierarchy-load-cluster
export serviceName=
export taskDefinition=
export repositoryName=hierarchy-service-backend/load/web
export region=us-east-2
export configName=hierarchy-load-cluster-config
export targetGroupName=
export loadBalancerName=hierarchy-ALB
export containerName=load-web
export logGroupName=
export ver=latest
export VPC=
export repositoryUri=113300553770.dkr.ecr.us-east-1.amazonaws.com/hierarchy-service-backend/load/web
export loadBalancerArn=
export targetGroupArn=arn:aws:elasticloadbalancing:us-east-1:113300553770:targetgroup/hierarchy-ALB-target-group/b2eedeb05250954b

###############################################################
# setup image in ecr
###############################################################

# create empty repository in ecr
aws ecr create-repository --repository-name $repositoryName

# build container to create image - done by circleci
# sudo docker build -t $containerName:$ver .

# tag local image to my remote ecr - done by circleci
# sudo docker tag $containerName:$ver $repositoryUri:$ver

# get ecr login key - done by circleci
# sudo $(aws ecr get-login --no-include-email)

# push image to ecr - done by circleci
# sudo docker push $repositoryUri:$ver

###############################################################
# build empty cluster in ecs and configure the local ecs-cli
###############################################################

# create empty cluster in ecs
ecs-cli up --empty --cluster $clusterName

# configure that cluster to local ecs-cli
ecs-cli configure --cluster $clusterName --region $region --config-name $configName --default-launch-type fargate

# set the new config as your defualt
ecs-cli configure default --config-name $configName

###############################################################
# create and config load balancer
###############################################################

# create application load balancer
aws elbv2 create-load-balancer --name $loadBalancerName --type application --subnets $subnet1 $subnet2 --security-groups $securityGroup

# create a listener for your load balancer with a default rule that forwards requests to the target group
aws elbv2 create-listener --load-balancer-arn $loadBalancerArn --protocol HTTP --port 80  --default-actions Type=forward,TargetGroupArn=$targetGroupArn

hello() { echo '{ "key": "value" }' }
echo $(hello) | grep -o '"key": "[^"]*' | grep -o '[^"]*$'

aws elbv2 delete-load-balancer --load-balancer-arn arn:aws:elasticloadbalancing:us-east-1:113300553770:loadbalancer/app/hierarchy-ALB/54b6d607cad850df

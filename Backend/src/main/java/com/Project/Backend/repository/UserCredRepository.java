package com.Project.Backend.repository;

import com.Project.Backend.model.UserCred;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserCredRepository extends MongoRepository<UserCred, String> {

    UserCred findByEmail(String email);

    @Aggregation(pipeline = { "{ $project: { email: 1, _id: 0 } }" })
    List<String> findAllEmail();

    List<UserCred> findByEmailIn(List<String> emails);

    boolean existsByEmail(String email);
}

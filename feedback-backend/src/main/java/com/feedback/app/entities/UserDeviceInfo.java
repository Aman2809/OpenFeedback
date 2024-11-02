package com.feedback.app.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "user_device_info")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDeviceInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long deviceId;

    @Column
    private String country;

    @Column
    private String deviceOs;

    @Column
    private String deviceOsVersion;

    @Column
    private String displayWidth;

    @Column
    private String displayHeight;

    @Column
    private String deviceRam;

    @Column
    private String deviceStorage;

    @Column
    private String deviceProcessorModel;

    private String email;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "feedback_id")
    @JsonBackReference
    private Feedback feedback;

}
